import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.ts";
import { IBottomTabIcon } from "../../../types/icon.interface.ts";


const ImportIcon: FC<IBottomTabIcon> = ({ size = 24, isFocused = false, fill = "none", stroke = COLORS.BLACK }) => {
  const s = verticalPixel(size)

  if (isFocused) {
    stroke = COLORS.WHITE;
    fill = COLORS.GRAY
  }
  return (
    <Svg width={s} height={s} fill="none" viewBox={"0 0 24 24"}>
      <Path
        d="M16.44 8.90002C20.04 9.21002 21.51 11.06 21.51 15.11V15.24C21.51 19.71 19.72 21.5 15.25 21.5H8.73998C4.26998 21.5 2.47998 19.71 2.47998 15.24V15.11C2.47998 11.09 3.92998 9.24002 7.46998 8.91002"
        stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={fill} />
      <Path d="M12 2V14.88" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={fill} />
      <Path d="M15.3499 12.65L11.9999 16L8.6499 12.65" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"
            strokeLinejoin="round" fill={fill} />
    </Svg>
  )
}

export default ImportIcon;

