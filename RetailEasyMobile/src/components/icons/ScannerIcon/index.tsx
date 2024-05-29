import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";
import { horizontalPixel } from "../../../utils/Normalizer.tsx";
import { BASE_SIZE } from "../../../constants/Size.ts";
import { IBottomTabIcon } from "../../../types/icon.interface.ts";


const ScannerIcon: FC<IBottomTabIcon> = ({size = 24, isFocused = false, fill = "none", stroke = COLORS.BLACK}) => {
  const s = horizontalPixel(size)
  const b = BASE_SIZE.ICON;

  if(isFocused){
    stroke = COLORS.WHITE;
    fill = COLORS.GRAY
  }
  return (
    <Svg width={s} height={s} fill="none" scale={s/b} >
      <Path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round" scale={s/b} fill={fill} />
      <Path d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round" scale={s/b} fill={fill} />
      <Path d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round" scale={s/b} fill={fill} />
      <Path d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round" scale={s/b} fill={fill} />
      <Path
        d="M17 9.5V14.5C17 16.5 16 17.5 14 17.5H10C8 17.5 7 16.5 7 14.5V9.5C7 7.5 8 6.5 10 6.5H14C16 6.5 17 7.5 17 9.5Z"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" scale={s/b} fill={fill} />
      <Path d="M19 12H5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" scale={s/b} fill={fill} />
    </Svg>
  )
}

export default ScannerIcon;
