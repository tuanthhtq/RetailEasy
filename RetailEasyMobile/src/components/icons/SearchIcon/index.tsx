import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";
import { horizontalPixel } from "../../../utils/Normalizer.tsx";
import { BASE_SIZE } from "../../../constants/Size.ts";
import { IBottomTabIcon } from "../../../types/icon.interface.ts";


const SearchIcon: FC<IBottomTabIcon> = ({size = 24, isFocused = false, fill = "none", stroke = COLORS.BLACK}) => {
  const s = horizontalPixel(size)
  const b = BASE_SIZE.ICON;

  if(isFocused){
    stroke = COLORS.WHITE;
    fill = COLORS.GRAY
  }
  return (
    <Svg width={s} height={s} fill="none" scale={s/b}>
      <Path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" scale={s/b}
        fill={fill}/>
      <Path d="M22 22L20 20" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            scale={s/b}
            fill={fill}/>
    </Svg>
  )
}

export default SearchIcon;
