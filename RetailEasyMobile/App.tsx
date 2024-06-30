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
import { ENDPOINT } from "./src/constants/Endpoint.ts";
import { getInitialState } from "./src/store/storeInitial/store.initial.slice.ts";
import SetupStoreStack from "./src/navigations/SetupStoreStack";
import { logout } from "./src/store/authentication/auth.slice.ts";

function Main(): React.JSX.Element {

  const authState = useSelector((state: IRootState ) =>  state.auth)
  // const initialState = { initialized: false }
  const initialState = useSelector((state: IRootState) => state.initialState)

  const [networkErr, setNetworkErr] = useState(false)

  const dispatch = useAppDispatch();


  //check server connection
  useEffect(() => {
    const interval = setInterval(() => {
      testServerConnectionService()
        .then(res => {
          if(res.data){
            setNetworkErr(false)
          }
        })
        .catch(err => {
          setNetworkErr(true)
        })
    }, 3000)

    return () => clearInterval(interval)
  })



  // const headers = {
  //   Authorization: authState.accessToken,
  // };

  // const ws = new WebSocket(ENDPOINT.WS, [],  {headers} );
  //
  // ws.onopen = () => {
  //   console.log("WS CONNECTED");
  // }
  //
  // ws.onerror = (e) => {
  //   console.log("WS ERROR", e);
  // }
  //
  // ws.onmessage = (m) => {
  //   console.log("WS MESSAGE", m);
  // }
  //
  // ws.onclose = () => {
  //   console.log("WS CLOSED");
  // }

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
          {initialState.initialized ?
            (authState.isAuthenticated ? <AuthorizedStack/> : <UnauthorizedStack/>) :
            <SetupStoreStack/>
          }
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
