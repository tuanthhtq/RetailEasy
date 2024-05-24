import {UnauthorizedStackName} from "../../constants/StackName.ts";
import {UnauthorizedParams} from "../../constants/ParamList.ts";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "../../screens/Login";
import Landing from "../../screens/Landing";
import CustomerFeedback from "../../screens/CustomerFeedback";
import LookupOrder from "../../screens/LookupOrder";

const Stack = createStackNavigator<UnauthorizedParams>();

const AuthorizedStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name={UnauthorizedStackName.LOGIN} component={Login}/>
      <Stack.Screen name={UnauthorizedStackName.LANDING} component={Landing}/>
      <Stack.Screen name={UnauthorizedStackName.FEEDBACK} component={CustomerFeedback}/>
      <Stack.Screen name={UnauthorizedStackName.LOOKUP_ORDER} component={LookupOrder}/>
    </Stack.Navigator>
  )
}

export default AuthorizedStack;
