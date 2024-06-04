import React from 'react';
import {
  SafeAreaView, Vibration
} from "react-native";
import UnauthorizedStack from "./src/navigations/Unauthorized/UnauthorizedStack";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";

function Main(): React.JSX.Element {
  // const isAuthorized = useSelector((state: any) => {
  //   return state.auth.isAuthorized;
  // })

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
