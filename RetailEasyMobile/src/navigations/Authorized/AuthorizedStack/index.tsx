import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { AuthorizedParams, AuthorizedStackName, } from "../../../constants/ParamList.ts";
import {useSelector} from "react-redux";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.tsx";
import Landing from "../../../screens/Landing";
import HomeIcon from "../../../components/icons/HomeIcon";

const Tab = createBottomTabNavigator<AuthorizedParams>();

const AuthorizedStack = () => {

  const roles: string[] = useSelector((state: any) => {
    return state.auth.roles
  })

  return(
    <Tab.Navigator
      initialRouteName={AuthorizedStackName.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PINK,
        tabBarStyle: {
          backgroundColor: COLORS.FADE,
          height: verticalPixel(64),
        }
      }}
    >
      <Tab.Screen
        name={AuthorizedStackName.HOME}
        component={Landing}
        options={{
          tabBarIcon: (({focused}) => <HomeIcon isFocused={focused}/>),
          tabBarLabel: "Trang chủ",
        }}
      />
      <Tab.Screen
        name={AuthorizedStackName.CREATE_BILL}
        component={Landing}
        options={{
          tabBarIcon: (({focused}) => <HomeIcon isFocused={focused}/>),
          tabBarLabel: "Tạo đơn",
        }}
      />
      <Tab.Screen
        name={AuthorizedStackName.IMPORT}
        component={Landing}
        options={{
          tabBarIcon: (({focused}) => <HomeIcon isFocused={focused}/>),
          tabBarLabel: "Nhập hàng",
        }}
      />
      <Tab.Screen
        name={AuthorizedStackName.IMPORT}
        component={Landing}
        options={{
          tabBarIcon: (({focused}) => <HomeIcon isFocused={focused}/>),
          tabBarLabel: "Hồ sơ",
        }}
      />
    </Tab.Navigator>
  )
}

export default AuthorizedStack;
