import { UnauthorizedParams, UnauthorizedStackName } from "../../../constants/ParamList.ts";
import Landing from "../../../screens/Landing";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeIcon from "../../../components/icons/HomeIcon";
import ScannerIcon from "../../../components/icons/ScannerIcon";
import ProfileIcon from "../../../components/icons/ProfileIcon";
import ScannerStack from "../ScannerStack";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.tsx";
import ProfileStack from "../ProfileStack";

const Tab = createBottomTabNavigator<UnauthorizedParams>();

const UnAuthorizedStack = () => {

  return(
    <Tab.Navigator
      initialRouteName={UnauthorizedStackName.LANDING}
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
        component={ProfileStack}
        options={{
          tabBarIcon: (({focused}) => <ProfileIcon isFocused={focused}/>),
        }}
      />
    </Tab.Navigator>
  )

}

export default UnAuthorizedStack;
