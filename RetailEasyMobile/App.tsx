import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import UnauthorizedStack from "./src/navigations/Unauthorized/UnauthorizedStack";
import { COLORS } from "./src/constants/Colors.ts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { Provider, useSelector } from "react-redux";
import { IRootState, store, useAppDispatch } from "./src/store/store.ts";
import AuthorizedStack from "./src/navigations/Authorized/AuthorizedStack";
import { getService } from "./src/apis/public/public.services.ts";
import PopupNotification from "./src/components/PopupNotification";
import { ENDPOINT } from "./src/constants/Endpoint.ts";
import SetupStoreStack from "./src/navigations/SetupStoreStack";
import { StoreInfoDto } from "./src/apis/public/dtos/store.info.dto.ts";
import { storeInitialState } from "./src/store/storeInitial/store.initial.action.ts";
import Toast from "react-native-toast-message";
import { fontPixel } from "./src/utils/Normalizer.ts";
import { toastTextStyle } from "./src/constants/String.ts";

function Main(): React.JSX.Element {

  const authState = useSelector((state: IRootState ) =>  state.auth)
  // const authState = {isAuthenticated: true}
  const initialState = useSelector((state: IRootState) => state.initialState)
  // const initialState = { initialized: true }

  const [networkErr, setNetworkErr] = useState(false)
  // const [networkErr, setNetworkErr] = useState(false)

  const dispatch = useAppDispatch();


  //check server connection
  useEffect(() => {
    const interval = setInterval(() => {
      getService<StoreInfoDto>(ENDPOINT.LANDING)
        .then((res) => {

          if(res.data){
            setNetworkErr(false)
          }
        })
        .catch((err) => {
          // setNetworkErr(true)
        })
    }, 3000)
    return () => clearInterval(interval)
  })

  //show toast for connection error
  useEffect(() => {
    if(networkErr){
        Toast.show({
        type: "error",
        text1: "Không thể kết nối đến server",
        autoHide: false,
        swipeable: false,
        text1Style: toastTextStyle
      })
    }
  }, [networkErr]);

  //check if store is initialized
  useEffect(() => {
    if(!initialState.initialized){
      dispatch(storeInitialState())
    }
  }, [initialState, networkErr])



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
      <Toast />
    </Provider>
  );
}


export default App;
