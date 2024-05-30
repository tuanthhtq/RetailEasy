import {UnauthorizedStackName} from "../../constants/StackName.ts";
import {UnauthorizedParams} from "../../constants/ParamList.ts";
import Login from "../../screens/Login";
import Landing from "../../screens/Landing";
import CustomerFeedback from "../../screens/CustomerFeedback";
import LookupOrder from "../../screens/LookupOrder";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator<UnauthorizedParams>();

const AuthorizedStack = () => {
  return(
    <Tab.Navigator
      initialRouteName={UnauthorizedStackName.LANDING}
    >
      <Tab.Screen name={UnauthorizedStackName.LOGIN} component={Login}/>
      <Tab.Screen name={UnauthorizedStackName.LANDING} component={Landing}/>
      <Tab.Screen name={UnauthorizedStackName.FEEDBACK} component={CustomerFeedback}/>
      <Tab.Screen name={UnauthorizedStackName.LOOKUP_ORDER} component={LookupOrder}/>
    </Tab.Navigator>
  )
}

export default AuthorizedStack;
