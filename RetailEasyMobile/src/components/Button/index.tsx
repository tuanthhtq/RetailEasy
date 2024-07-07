import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";


interface IButton {
  onClick?: ()=> void
  label: string | ReactNode
  size?: "large" | "medium" | "small" | "square",
  color?: "pink" | "green",
  customStyle?: StyleProp<ViewStyle>
}

const Button: React.FC<IButton> = ({label, size = "large", onClick = () => {}, color = COLORS.PINK, ...props }) => {


  let buttonStyle: StyleProp<ViewStyle> = {
    backgroundColor: color === "pink" ? COLORS.PINK : COLORS.GREEN,
    width: horizontalPixel(300),
    height: verticalPixel(60),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }

  let textStyle: StyleProp<TextStyle> = {
    color: COLORS.WHITE,
    fontSize: fontPixel(20),
    textAlign: 'center',
  }

  if(size === "square"){
    buttonStyle = {
      ...buttonStyle,
      width: horizontalPixel(43),
      height: horizontalPixel(43)
    }
    textStyle = {
      ...textStyle,
      fontSize: fontPixel(14),
    }
  }else if(size === "small"){
    buttonStyle = {
      ...buttonStyle,
      width: horizontalPixel(100),
      height: horizontalPixel(40)
    }
  }else if(size === "medium"){
    buttonStyle = {
      ...buttonStyle,
      width: horizontalPixel(130),
      height: horizontalPixel(36)
    }
  }

  return (
    <TouchableOpacity
      style={[buttonStyle, props.customStyle]}
      onPress={onClick}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button;
