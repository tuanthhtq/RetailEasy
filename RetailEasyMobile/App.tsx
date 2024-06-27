import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import UnauthorizedStack from "./src/navigations/Unauthorized/UnauthorizedStack";
import { COLORS } from "./src/constants/Colors.ts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider, useSelector } from "react-redux";
import { IRootState, store, useAppDispatch } from "./src/store/store.ts";
import AuthorizedStack from "./src/navigations/Authorized/AuthorizedStack";
import { testServerConnectionService } from "./src/apis/public/public.services.ts";
import PopupNotification from "./src/components/PopupNotification";

function Main(): React.JSX.Element {

  const authState = useSelector((state: IRootState ) =>  state.auth)

  const [networkErr, setNetworkErr] = useState(false)

  //check server connection
  useEffect(() => {
    testServerConnectionService()
      .then(res => {
        if(res.data){
          setNetworkErr(false)
        }
      })
      .catch(err => {
        setNetworkErr(true)
      })
  })

  const headers = {
    Authorization: authState.accessToken,  // Replace with your authentication token
  };

  const ws = new WebSocket("ws://192.168.31.211:8080/ws", [],  {headers} );

  ws.onopen = () => {
    console.log("WS CONNECTED");
  }

  ws.onerror = (e) => {
    console.log("WS ERROR", e);
  }

  ws.onmessage = (m) => {
    console.log("WS MESSAGE", m);
  }

  return (
    <SafeAreaProvider
      style={{
        flex: 1
      }}
    >
      <PopupNotification label={"Không thể kết nối đến server"} visible={networkErr}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        style={{flex: 1}}
      >
        <NavigationContainer
        theme={{
          ...DefaultTheme,
          dark: true,
          colors: {
            ...DefaultTheme.colors,
            background: COLORS.WHITE,
            primary: COLORS.WHITE,
            text: COLORS.WHITE
          }

        }}
        >
        {authState.isAuthenticated? <AuthorizedStack/> : <UnauthorizedStack/>}
        </NavigationContainer>
  </KeyboardAvoidingView>
</SafeAreaProvider>
  );
}


function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}


export default App;
