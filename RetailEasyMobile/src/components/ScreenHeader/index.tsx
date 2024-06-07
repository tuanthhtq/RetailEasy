import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel, SCREEN_HEIGHT, SCREEN_WIDTH, verticalPixel } from "../../utils/Normalizer.tsx";
import Logo from "../icons/Logo";
import { COLORS } from "../../constants/Colors.ts";
import RoundTriangleIcon from "../icons/RoundTriangleIcon";

interface IScreenHeader{
  label?: string,
  isLogo?: boolean,
  hasBack?: boolean
}


const ScreenHeader: React.FC<IScreenHeader> = ({label, isLogo = true, hasBack = false}) => {
  let content: ReactNode = <Logo/>
  if(!isLogo) content =
    <>
      {hasBack && <RoundTriangleIcon size={42}/>}
      <Text style={style.label}>{label}</Text>
    </>

  return (
    <View style={style.container}>
      <View style={style.content}>{content}</View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: horizontalPixel(360),
    height: verticalPixel(127),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_ORANGE
  },
  content: {
    width: horizontalPixel(341),
    height: verticalPixel(59),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  label: {
    color: COLORS.BLACK,
    fontSize: fontPixel(24),
    fontWeight: '600',
  }

})

export default ScreenHeader;
