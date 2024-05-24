import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AuthorizedParams, UnauthorizedParams} from "../../constants/ParamList.ts";
import login from "../../screens/Login";
import {useSelector} from "react-redux";
import {AuthorizedStackName} from "../../constants/StackName.ts";


const Tab = createBottomTabNavigator<AuthorizedParams>();

const AuthorizedStack = () => {

  const roles: string[] = useSelector((state: any) => {
    return state.auth.roles
  })


  return(
    <Tab.Navigator>
      <Tab.Screen name={AuthorizedStackName.MENU} component={login}/>

    </Tab.Navigator>
  )
}

export default AuthorizedStack;
