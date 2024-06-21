import React from 'react';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import UnauthorizedStack from "./src/navigations/Unauthorized/UnauthorizedStack";
import { COLORS } from "./src/constants/Colors.ts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider, useSelector } from "react-redux";
import { IRootState, store } from "./src/store/store.ts";
import AuthorizedStack from "./src/navigations/Authorized/AuthorizedStack";

function Main(): React.JSX.Element {
  const isAuthorized = useSelector((state: IRootState ) => {
    return state.auth.isAuthenticated;
  })

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
        {isAuthorized ? <AuthorizedStack/> : <UnauthorizedStack/>}
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
