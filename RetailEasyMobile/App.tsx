import React from 'react';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import UnauthorizedStack from "./src/navigations/Unauthorized/UnauthorizedStack";
import { COLORS } from "./src/constants/Colors.ts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { IRootState, store } from "./src/store/store.ts";
import { login } from "./src/store/authentication/auth.action.ts";
import { IAuthState } from "./src/store/authentication/auth.type.ts";
import { RootState } from "@reduxjs/toolkit/query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function Main(): React.JSX.Element {
  const state = useSelector((state: IRootState ) => {
  })
  return (
    <SafeAreaProvider
      style={{
        height: "100%"
      }}
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
        {/*{isAuthorized ? <AuthorizedStack/> : <UnauthorizedStack/>}*/}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          style={{flex: 1}}
        >
          <SafeAreaProvider>
            <UnauthorizedStack/>
          </SafeAreaProvider>
        </KeyboardAvoidingView>
      </NavigationContainer>
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
