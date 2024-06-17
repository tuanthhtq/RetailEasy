import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel , verticalPixel } from "../../utils/Normalizer.tsx";
import { COLORS } from "../../constants/Colors.ts";
import RoundTriangleIcon from "../icons/RoundTriangleIcon";
import { StackActions, useNavigation } from "@react-navigation/native";

interface IScreenHeader{
  label?: string,
  logo?: boolean,
  backBtn?: boolean,

}

const ScreenHeader: React.FC<IScreenHeader> = ({label, logo = false, backBtn = true
}) => {

  const navigation = useNavigation()
  const goBack = () => {
    navigation.dispatch(StackActions.pop(1))
  }

  return (
    <View style={[style.container, {height: verticalPixel(logo ? 127 : 79)}]}>
      <View style={[style.content, {height: verticalPixel(logo ? 59 : 52)}]}>
        {backBtn &&
          <View onTouchStart={() => goBack()}><RoundTriangleIcon/></View>
        }
        {
          logo && <Text style={style.logo}>RetailEasy</Text>
        }
        {
          label && <Text style={style.label}>{label}</Text>
        }
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: horizontalPixel(360),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.FADE
  },
  content: {
    width: horizontalPixel(320),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: horizontalPixel(15)
  },
  label: {
    color: COLORS.BLACK,
    fontSize: fontPixel(24),
    fontWeight: '600',
  },
  logo: {
    color: COLORS.BLACK,
    fontSize: fontPixel(45),
    fontWeight: '700',

  }

})

export default ScreenHeader;
