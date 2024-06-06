import React from 'react';
import {
  SafeAreaView
} from "react-native";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import UnauthorizedStack from "./src/navigations/Unauthorized/UnauthorizedStack";

function Main(): React.JSX.Element {

  return (
    <SafeAreaView
      style={{
        height: "100%"
      }}
    >
      <NavigationContainer
        theme={ DarkTheme }
      >
        {/*{isAuthorized ? <AuthorizedStack/> : <UnauthorizedStack/>}*/}
        <UnauthorizedStack/>
      </NavigationContainer>
    </SafeAreaView>
  );
}


function App() {
  return (
    <Main/>
  );
}


export default App;
