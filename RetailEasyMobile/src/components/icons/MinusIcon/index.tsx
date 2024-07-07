import React from "react";
import { ICommonIcon } from "../../../types/icon.interface.ts";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.ts";


const MinusIcon: React.FC<ICommonIcon> = ({size = 24, color = COLORS.BLACK}) => {
  const s = verticalPixel(size)
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none" >
      <Path d="M8.40002 11.9999H15.6M21.6 11.9999C21.6 17.3018 17.302 21.5999 12 21.5999C6.69809 21.5999 2.40002 17.3018 2.40002 11.9999C2.40002 6.69797 6.69809 2.3999 12 2.3999C17.302 2.3999 21.6 6.69797 21.6 11.9999Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>

  )
}

export default MinusIcon
