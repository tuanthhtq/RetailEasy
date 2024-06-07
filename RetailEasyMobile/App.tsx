import React from 'react';
import {
  SafeAreaView
} from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import UnauthorizedStack from "./src/navigations/Unauthorized/UnauthorizedStack";
import { COLORS } from "./src/constants/Colors.ts";
import { SafeAreaProvider } from "react-native-safe-area-context";

function Main(): React.JSX.Element {

  return (
    <SafeAreaProvider
      style={{
        height: "100%"
      }}
    >
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            text: COLORS.BLACK
          }

        }}
      >
        {/*{isAuthorized ? <AuthorizedStack/> : <UnauthorizedStack/>}*/}
        <UnauthorizedStack/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


function App() {
  return (
    <Main/>
  );
}


export default App;
