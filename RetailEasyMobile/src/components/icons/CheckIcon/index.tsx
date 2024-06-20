import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";
import { verticalPixel } from "../../../utils/Normalizer.ts";
import { ICommonIcon } from "../../../types/icon.interface.ts";


const CheckIcon: FC<ICommonIcon> = ({ size = 24, color = COLORS.PINK }) => {
  const s = verticalPixel(size)

  return (
    <Svg width={s} height={s} fill="none" viewBox={"0 0 24 24"}>
      <Path
        d="M16.8 8.3999L9.64043 15.5999L7.19995 13.1456"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default CheckIcon;
