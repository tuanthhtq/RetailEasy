import React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.ts";
import { IBottomTabIcon } from "../../../types/icon.interface.ts";


const SearchIcon: React.FC<IBottomTabIcon> = ({size = 24, isFocused = false, fill = "none", stroke = COLORS.PINK}) => {
  const s = verticalPixel(size)

  if(isFocused){
    stroke = COLORS.WHITE;
    fill = COLORS.GRAY
  }
  return (
    <Svg width={s} height={s} fill="none" viewBox={"0 0 24 24"}>
      <Path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={fill}/>
      <Path d="M22 22L20 20" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={fill}/>
    </Svg>
  )
}

export default SearchIcon;
