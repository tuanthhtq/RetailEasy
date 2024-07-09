import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UnAuthProfileParams, UnAuthProfileStackName } from "../../../constants/ParamList.ts";
import Login from "../../../screens/Login";
import UnAuthProfile from "../../../screens/UnAuthProfile";
import OrderHistory from "../../../screens/OrderHistory";
import Feedback from "../../../screens/Feedback";


const ProfileStack = () => {

  const Stack = createNativeStackNavigator<UnAuthProfileParams>();

  // @ts-ignore
  return (
    <Stack.Navigator
      initialRouteName={UnAuthProfileStackName.MAIN}
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen name={UnAuthProfileStackName.MAIN} component={UnAuthProfile}/>
      <Stack.Screen name={UnAuthProfileStackName.ORDER_HISTORY} component={OrderHistory}/>
      <Stack.Screen name={UnAuthProfileStackName.FEEDBACK} component={Feedback}/>
      <Stack.Screen name={UnAuthProfileStackName.LOGIN} component={Login}/>
    </Stack.Navigator>
  )
}

export default ProfileStack;
