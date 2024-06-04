import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UnAuthProfileParams } from "../../../constants/ParamList.ts";
import { UnAuthProfileStackName } from "../../../constants/StackName.ts";
import Login from "../../../screens/Login";


const ProfileStack = () => {

  const Stack = createNativeStackNavigator<UnAuthProfileParams>();

  return (
    <Stack.Navigator>
      <Stack.Screen name={UnAuthProfileStackName.LOGIN} component={Login}/>
      <Stack.Screen name={UnAuthProfileStackName.ORDER_LOOKUP} component={Login}/>
      <Stack.Screen name={UnAuthProfileStackName.FEEDBACK} component={Login}/>
    </Stack.Navigator>
  )
}

export default ProfileStack;
