import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import React from "react";
import Button from "../../components/Button";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SetupStoreParams, SetupStoreStackName } from "../../constants/ParamList.ts";


type NavigationProp = NativeStackScreenProps<SetupStoreParams, SetupStoreStackName.HOME>

const SetupStore = ({navigation}: NavigationProp) =>{

  const next = () => {
    navigation.navigate(SetupStoreStackName.GET_DATA)
  }

  return (
    <View style={style.container} >
      <ScreenHeader logo backBtn={false}/>
      <View style={style.main}>
        <View style={style.textContainer}>
          <View><Text style={style.text}>Chào mừng đến với </Text><Text style={style.appName}>RetailEasy</Text></View>
          <View><Text style={style.subText}>Phần mềm quản lý bán hàng tiện dụng</Text></View>
        </View>
        <Button label={"Bắt đầu"} onClick={next}/>
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalPixel(100),
    width: horizontalPixel(360),
  },
  textContainer: {
    width: horizontalPixel(340),
    flexDirection: 'column',
    gap: verticalPixel(10)
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(30)
  },
  appName: {
    color: COLORS.BLACK,
    fontSize: fontPixel(35),
    fontWeight: '500'
  },
  subText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(24)
  }

})

export default SetupStore;
