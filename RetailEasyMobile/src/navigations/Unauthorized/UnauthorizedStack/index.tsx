import {UnauthorizedStackName} from "../../../constants/StackName.ts";
import {UnauthorizedParams} from "../../../constants/ParamList.ts";
import Login from "../../../screens/Login";
import Landing from "../../../screens/Landing";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeIcon from "../../../components/icons/HomeIcon";
import ScannerIcon from "../../../components/icons/ScannerIcon";
import ProfileIcon from "../../../components/icons/ProfileIcon";
import ScannerStack from "../ScannerStack";
import ScreenHeader from "../../../components/ScreenHeader";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.tsx";
import UnAuthProfile from "../../../screens/UnAuthProfile";

const Tab = createBottomTabNavigator<UnauthorizedParams>();

const AuthorizedStack = () => {

  return(
    <Tab.Navigator
      initialRouteName={UnauthorizedStackName.LANDING}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.CHOCOLATE_COSMOS,
        tabBarStyle: {
          backgroundColor: COLORS.LIGHT_ORANGE,
          height: verticalPixel(64),
        }
      }}

    >
      <Tab.Screen
        name={UnauthorizedStackName.LANDING}
        component={Landing}
        options={{
          tabBarIcon: (({focused}) => <HomeIcon isFocused={focused}/>),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name={UnauthorizedStackName.SCANNER}
        component={ScannerStack}
        options={{
          tabBarIcon: (({focused}) => <ScannerIcon isFocused={focused}/>),
          tabBarLabel: "Scanner",
        }}
      />
      <Tab.Screen
        name={UnauthorizedStackName.PROFILE}
        component={UnAuthProfile}
        options={{
          tabBarIcon: (({focused}) => <ProfileIcon isFocused={focused}/>),
        }}
      />
    </Tab.Navigator>
  )
}

export default AuthorizedStack;
