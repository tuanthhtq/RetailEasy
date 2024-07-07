import React from "react";
import { ICommonIcon } from "../../../types/icon.interface.ts";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.ts";


const PlusIcon: React.FC<ICommonIcon> = ({size = 24, color = COLORS.BLACK}) => {
  const s = verticalPixel(size)
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4.7998L12 19.1998M19.2 11.9998L4.79999 11.9998" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
    </Svg>

  )
}

export default PlusIcon
