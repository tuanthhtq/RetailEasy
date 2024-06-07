import React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../constants/Colors.ts";

interface IRoundTriangleIcon {
  direction?: "l" | "u" | "d" | "r"
  size?: number
  fill?: string
}

const RoundTriangleIcon: React.FC<IRoundTriangleIcon> = ({ direction, size = 24, fill = COLORS.BLACK}) => {
  let rotate = 0;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.1 19.15C14.26 19.15 13.34 18.88 12.41 18.34L7.78 15.67C6.15 14.72 5.25 13.42 5.25 12C5.25 10.58 6.15 9.28 7.78 8.34L12.41 5.67C14.04 4.73 15.61 4.6 16.85 5.31C18.08 6.02 18.76 7.45 18.76 9.33V14.67C18.76 16.55 18.08 17.98 16.85 18.69C16.32 19 15.73 19.15 15.1 19.15ZM15.1 6.36C14.52 6.36 13.86 6.56 13.16 6.97L8.53 9.64C7.38 10.3 6.75 11.14 6.75 12C6.75 12.86 7.38 13.7 8.53 14.36L13.16 17.03C14.31 17.69 15.35 17.82 16.1 17.39C16.85 16.96 17.26 15.99 17.26 14.67V9.33C17.26 8.01 16.85 7.04 16.1 6.61C15.8 6.44 15.46 6.36 15.1 6.36Z"
        fill={fill}/>
    </Svg>

  )
}

export default RoundTriangleIcon;
