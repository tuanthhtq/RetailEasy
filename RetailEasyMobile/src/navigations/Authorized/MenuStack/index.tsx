import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuParams, MenuStackName } from "../../../constants/ParamList.ts";
import Menu from "../../../screens/Menu";

const MenuStack = () => {

  const Stack = createNativeStackNavigator<MenuParams>();


  return (
    <Stack.Navigator
      initialRouteName={MenuStackName.MENU_HOME}
      screenOptions={{
        headerShown: false
      }}
    >

      <Stack.Screen name={MenuStackName.MENU_HOME} component={Menu}/>
    </Stack.Navigator>
  )
}

export default MenuStack
