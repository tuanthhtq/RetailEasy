import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { AuthorizedParams, AuthorizedStackName, } from "../../../constants/ParamList.ts";
import {useSelector} from "react-redux";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.ts";
import HomeIcon from "../../../components/icons/HomeIcon";
import { IRootState } from "../../../store/store.ts";
import Home from "../../../screens/Home";
import CreateBillIcon from "../../../components/icons/CreateBillIcon";
import ImportIcon from "../../../components/icons/ImportIcon";
import MenuIcon from "../../../components/icons/MenuIcon";
import ProfileIcon from "../../../components/icons/ProfileIcon";
import menuStack from "../MenuStack";
import createBillStack from "../CreateBillStack";

const Tab = createBottomTabNavigator<AuthorizedParams>();

const AuthorizedStack = () => {

  const roles = useSelector((state: IRootState) => {
    console.log(state.auth.roles.includes("ROLE_CASHIER") || state.auth.roles.includes("ROLE_ADMIN"));
    return state.auth.roles;
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
        component={Home}
        options={{
          tabBarIcon: (({focused}) => <HomeIcon isFocused={focused}/>),
          tabBarLabel: "Trang chủ",
          tabBarInactiveTintColor: COLORS.BLACK
        }}
      />

      {(roles.includes("ROLE_CASHIER") || roles.includes("ROLE_ADMIN")) &&
        <Tab.Screen
          name={AuthorizedStackName.CREATE_BILL}
          component={createBillStack}
          options={{
            tabBarIcon: (({focused}) => <CreateBillIcon isFocused={focused}/>),
            tabBarLabel: "Tạo đơn",
            tabBarInactiveTintColor: COLORS.BLACK
          }}
        />
      }
      {(roles.includes("ROLE_DATA_ENTRY") || roles.includes("ROLE_ADMIN")) &&
        <Tab.Screen
          name={AuthorizedStackName.IMPORT}
          component={Home}
          options={{
            tabBarIcon: (({focused}) => <ImportIcon isFocused={focused}/>),
            tabBarLabel: "Nhập hàng",
            tabBarInactiveTintColor: COLORS.BLACK
          }}
        />
      }
      {(roles.includes("ROLE_ADMIN")) ?
          <Tab.Screen
            name={AuthorizedStackName.PROFILE}
            component={menuStack}
            options={{
              tabBarIcon: (({focused}) => <MenuIcon isFocused={focused}/>),
              tabBarLabel: "Menu",
              tabBarInactiveTintColor: COLORS.BLACK
            }}
          /> :
          <Tab.Screen
            name={AuthorizedStackName.PROFILE}
            component={Home}
            options={{
              tabBarIcon: (({focused}) => <ProfileIcon isFocused={focused}/>),
              tabBarLabel: "Hồ sơ",
              tabBarInactiveTintColor: COLORS.BLACK
            }}
          />
      }
    </Tab.Navigator>
  )
}

export default AuthorizedStack;
