import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel , verticalPixel } from "../../utils/Normalizer.tsx";
import { COLORS } from "../../constants/Colors.ts";
import RoundTriangleIcon from "../icons/RoundTriangleIcon";

interface IScreenHeader{
  label?: string,
  logo?: ReactNode,
  backBtn?: boolean
}


const ScreenHeader: React.FC<IScreenHeader> = ({label, logo, backBtn = true}) => {

  return (
    <View style={[style.container, {height: verticalPixel(logo ? 127 : 79)}]}>
      <View style={[style.content, {height: verticalPixel(logo ? 59 : 52)}]}>
        {backBtn &&
          <RoundTriangleIcon/>
        }
        {
          logo && logo
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
  }

})

export default ScreenHeader;
