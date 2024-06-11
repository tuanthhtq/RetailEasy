import React from "react";
import Svg, { Path } from "react-native-svg";
import { ICommonIcon } from "../../../types/icon.interface.ts";
import { COLORS } from "../../../constants/Colors.ts";
import { horizontalPixel } from "../../../utils/Normalizer.tsx";


const ChatIcon: React.FC<ICommonIcon> = ({size = 24, color = COLORS.PINK}) => {
  const s = horizontalPixel(size)

  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none" >
      <Path
        d="M15.5 11.25H8.5C8.09 11.25 7.75 10.91 7.75 10.5C7.75 10.09 8.09 9.75 8.5 9.75H15.5C15.91 9.75 16.25 10.09 16.25 10.5C16.25 10.91 15.91 11.25 15.5 11.25Z"
        fill={color} />
      <Path
        d="M16 22.3199C15.66 22.3199 15.32 22.22 15.03 22.03L10.77 19.1899H7C3.56 19.1899 1.25 16.8799 1.25 13.4399V7.43994C1.25 3.99994 3.56 1.68994 7 1.68994H17C20.44 1.68994 22.75 3.99994 22.75 7.43994V13.4399C22.75 16.6199 20.77 18.84 17.75 19.15V20.5699C17.75 21.2199 17.4 21.8099 16.83 22.1099C16.57 22.2499 16.28 22.3199 16 22.3199ZM7 3.17993C4.42 3.17993 2.75 4.84993 2.75 7.42993V13.4299C2.75 16.0099 4.42 17.6799 7 17.6799H11C11.15 17.6799 11.29 17.7199 11.42 17.8099L15.87 20.77C15.98 20.84 16.08 20.81 16.13 20.78C16.18 20.75 16.26 20.6899 16.26 20.5599V18.4299C16.26 18.0199 16.6 17.6799 17.01 17.6799C19.59 17.6799 21.26 16.0099 21.26 13.4299V7.42993C21.26 4.84993 19.59 3.17993 17.01 3.17993H7Z"
        fill={color} />
    </Svg>

  )
}

export default ChatIcon
