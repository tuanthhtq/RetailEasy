import React from "react";
import { ICommonIcon } from "../../../types/icon.interface.ts";
import Svg, { Path } from "react-native-svg";
import { verticalPixel } from "../../../utils/Normalizer.ts";
import { COLORS } from "../../../constants/Colors.ts";


const MailIcon: React.FC<ICommonIcon> =({size = 24, color = COLORS.PINK}) => {
  const s = verticalPixel(size)


  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.5999 6.1043L11.9999 12.7043L20.9999 6.1043M8.9999 12.6043L3.5999 18.1043M20.3999 17.6043L14.3999 12.1043M4.7999 19.0956C3.47442 19.0956 2.3999 18.0211 2.3999 16.6956V7.3043C2.3999 5.97882 3.47442 4.9043 4.7999 4.9043H19.1999C20.5254 4.9043 21.5999 5.97881 21.5999 7.3043V16.6956C21.5999 18.0211 20.5254 19.0956 19.1999 19.0956H4.7999Z"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>

  )
}

export default MailIcon
