import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UnAuthProfileParams } from "../../../constants/ParamList.ts";
import { UnAuthProfileStackName } from "../../../constants/StackName.ts";
import Login from "../../../screens/Login";
import UnAuthProfile from "../../../screens/UnAuthProfile";
import OrderHistory from "../../../screens/OrderHistory";


const ProfileStack = () => {

  const Stack = createNativeStackNavigator<UnAuthProfileParams>();

  return (
    <Stack.Navigator
      initialRouteName={UnAuthProfileStackName.MAIN}
    >
      <Stack.Screen name={UnAuthProfileStackName.MAIN} component={ProfileStack}/>
      <Stack.Screen name={UnAuthProfileStackName.ORDER_HISTORY} component={OrderHistory}/>
      <Stack.Screen name={UnAuthProfileStackName.FEEDBACK} component={Login}/>
    </Stack.Navigator>
  )
}

export default ProfileStack;
