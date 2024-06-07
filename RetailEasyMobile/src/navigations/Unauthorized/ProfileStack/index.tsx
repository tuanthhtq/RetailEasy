import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UnAuthProfileParams } from "../../../constants/ParamList.ts";
import { AuthorizedStackName, UnAuthProfileStackName } from "../../../constants/StackName.ts";
import Login from "../../../screens/Login";
import UnAuthProfile from "../../../screens/UnAuthProfile";


const ProfileStack = () => {

  const Stack = createNativeStackNavigator<UnAuthProfileParams>();

  return (
    <Stack.Navigator
      initialRouteName={UnAuthProfileStackName.MAIN}
    >
      <Stack.Screen name={UnAuthProfileStackName.MAIN} component={UnAuthProfile}/>
      <Stack.Screen name={UnAuthProfileStackName.ORDER_LOOKUP} component={Login}/>
      <Stack.Screen name={UnAuthProfileStackName.FEEDBACK} component={Login}/>
    </Stack.Navigator>
  )
}

export default ProfileStack;
