import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import { COLORS } from "../../constants/Colors.ts";
import Divider from "../../components/icons/Divider";
import ArchiveIcon from "../../components/icons/ArchiveIcon";
import ChatIcon from "../../components/icons/ChatIcon";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnAuthProfileParams, UnAuthProfileStackName } from "../../constants/ParamList.ts";
import React from "react";
import LoginIcon from "../../components/icons/LoginIcon";


type NavigationProp = NativeStackScreenProps<UnAuthProfileParams, UnAuthProfileStackName.MAIN>

const UnAuthProfile = ({navigation} : NavigationProp) => {

  return (
    <View style={style.container}>
      <ScreenHeader label={"Hồ sơ"} backBtn={false} />
      <View style={style.main}>
        <View style={style.customer}>
          <View style={style.heading}>
            <Text style={style.headingText}>Dành cho khách hàng</Text>
          </View>
          <View style={style.list}>
            <View style={style.listItem}>
              <View
                style={style.itemMain}
                onTouchStart={() => navigation.navigate(UnAuthProfileStackName.ORDER_HISTORY)}
              >
                <ArchiveIcon/><Text style={style.text}>Lịch sử mua hàng</Text>
              </View>
              <Divider/>
            </View>
            <View style={style.listItem}>
              <View
                style={style.itemMain}
                onTouchStart={() => navigation.navigate(UnAuthProfileStackName.FEEDBACK)}
              >
                <ChatIcon/><Text style={style.text}>Phản hồi</Text>
              </View>
              <Divider/>
            </View>
          </View>
        </View>
        <View style={style.employee}>
          <View style={style.heading}>
            <Text style={style.headingText}>Dành cho nhân viên</Text>
          </View>
          <View style={style.list}>
            <View style={style.listItem}>
              <View
                style={style.itemMain}
                onTouchStart={() => navigation.navigate(UnAuthProfileStackName.LOGIN)}
              >
                <LoginIcon/><Text style={style.text}>Đăng nhập</Text>
              </View>
              <Divider/>
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  main: {
    width: horizontalPixel(320),
    height: verticalPixel(624),
    marginTop: verticalPixel(15),
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  heading: {
  },
  headingText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(28),
    fontWeight: 'bold'
  },
  customer: {
    width: horizontalPixel(315),
    height: verticalPixel(230),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  employee: {
    width: horizontalPixel(315),
    height: verticalPixel(150),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  list: {
  },
  listItem: {
    width: horizontalPixel(315),
    height: verticalPixel(79),
    flexDirection: 'column',
    alignItems: 'center'

  },
  itemMain:{
    flexDirection: 'row',
    width: horizontalPixel(291),
    height: verticalPixel(48),
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: horizontalPixel(10),
    paddingHorizontal: horizontalPixel(10)
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(16)
  }
})

export default UnAuthProfile;
