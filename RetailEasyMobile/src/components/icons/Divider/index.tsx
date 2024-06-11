import React from "react";
import Svg, { Line, Path, Rect } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";
import { horizontalPixel } from "../../../utils/Normalizer.tsx";
import { ICommonIcon } from "../../../types/icon.interface.ts";


const Divider: React.FC<ICommonIcon> = ({ size = 300, color = COLORS.PINK }) => {
  const w = horizontalPixel(size);

  return (
    <Svg width={w} height={2} viewBox="0 0 300 2 " fill="none" style={{alignSelf: 'center'}}>
      <Path fillRule="evenodd" clipRule="evenodd" d="M300 1.5H0V0.5H300V1.5Z" fill={color} />
    </Svg>

  )
}


export default Divider
