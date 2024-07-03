import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { UnAuthProfileStackName } from "../../constants/ParamList.ts";
import ArchiveIcon from "../../components/icons/ArchiveIcon";
import React from "react";
import LogoutIcon from "../../components/icons/LogoutIcon";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import { useAppDispatch } from "../../store/store.ts";
import { logout } from "../../store/authentication/auth.slice.ts";


const Menu = () => {

  const dispatch = useAppDispatch();



  return (
    <View style={style.container}>
      <ScreenHeader label={"Menu"} backBtn={false}/>
      <View style={style.main}>
        <View style={style.section}>
          <View style={style.item} onTouchStart={() => dispatch(logout())} >
            <LogoutIcon/><Text style={style.text}>Đăng xuất khỏi ứng dụng</Text>
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
  section: {

  },
  item: {
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

export default Menu
