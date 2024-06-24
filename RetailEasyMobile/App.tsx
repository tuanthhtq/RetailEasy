import React, { useEffect } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import UnauthorizedStack from "./src/navigations/Unauthorized/UnauthorizedStack";
import { COLORS } from "./src/constants/Colors.ts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider, useSelector } from "react-redux";
import { IRootState, store, useAppDispatch } from "./src/store/store.ts";
import AuthorizedStack from "./src/navigations/Authorized/AuthorizedStack";
import { logout } from "./src/store/authentication/auth.slice.ts";
import { setBillCustomerInfo } from "./src/store/bill/bill.slice.ts";
import { getStoreInfoService, testServerConnectionService } from "./src/apis/public/public.services.ts";
import { serverConnect } from "./src/store/public/public.action.ts";

function Main(): React.JSX.Element {

  const authState = useSelector((state: IRootState ) => {
    return state.auth;
  })

  const appDispatch = useAppDispatch();

  useEffect(() => {
    testServerConnectionService()
      .then((response) => {
        console.log({response});
      })
      .catch((err) => {
        console.log({err});
      })
  });

  useEffect(() => {
    if(!authState.accessToken){
      appDispatch(logout())
    }
  }, [authState]);

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
