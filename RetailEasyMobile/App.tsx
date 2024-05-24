
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider, useSelector} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import AuthorizedStack from "./src/navigations/AuthorizedStack";
import UnauthorizedStack from "./src/navigations/UnauthorizedStack";

function Main(): React.JSX.Element {
  const isAuthorized = useSelector((state: any) => {
    return state.auth.isAuthorized;
  })
  return (
    <SafeAreaView>
      <NavigationContainer>
        {isAuthorized ? <AuthorizedStack/> : <UnauthorizedStack/>}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const App = () => {
  return(
    // <Provider>
    <Main/>
    // </Provider>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export default App;
