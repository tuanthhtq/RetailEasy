import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { AuthorizedParams, AuthorizedStackName, } from "../../../constants/ParamList.ts";
import {useSelector} from "react-redux";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.ts";
import HomeIcon from "../../../components/icons/HomeIcon";
import { IRootState, useAppDispatch } from "../../../store/store.ts";
import Home from "../../../screens/Home";
import CreateBillIcon from "../../../components/icons/CreateBillIcon";
import ImportIcon from "../../../components/icons/ImportIcon";
import MenuIcon from "../../../components/icons/MenuIcon";
import ProfileIcon from "../../../components/icons/ProfileIcon";
import createBillStack from "../CreateBillStack";
import { useEffect } from "react";
import { logout } from "../../../store/authentication/auth.slice.ts";
import ImportStack from "../ImportStack";
import MenuStack from "../MenuStack";

const Tab = createBottomTabNavigator<AuthorizedParams>();

const AuthorizedStack = () => {

  const authState = useSelector((state: IRootState) => {
    return state.auth;
  })

  const appDispatch = useAppDispatch();

  //check authentication
  useEffect(() => {
    if(!authState.accessToken){
      appDispatch(logout())
    }
  }, [authState]);


  return(
    <Tab.Navigator
      initialRouteName={AuthorizedStackName.HOME}
      screenOptions={() => {
        return {
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarActiveTintColor: COLORS.PINK,
          tabBarStyle: {
            backgroundColor: COLORS.FADE,
            height: verticalPixel(64),
          }
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

      {(authState.roles.includes("ROLE_CASHIER") || authState.roles.includes("ROLE_ADMIN")) &&
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
      {(authState.roles.includes("ROLE_DATA_ENTRY") || authState.roles.includes("ROLE_ADMIN")) &&
        <Tab.Screen
          name={AuthorizedStackName.IMPORT}
          component={ImportStack}
          options={{
            tabBarIcon: (({focused}) => <ImportIcon isFocused={focused}/>),
            tabBarLabel: "Nhập hàng",
            tabBarInactiveTintColor: COLORS.BLACK
          }}
        />
      }
      {(authState.roles.includes("ROLE_ADMIN")) ?
          <Tab.Screen
            name={AuthorizedStackName.PROFILE}
            component={MenuStack}
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
