import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";


interface IButton {
  onClick: ()=> void
  label: string
  size?: "large" | "medium" | "small" | "square",
  color?: "pink" | "green"
}

const Button: React.FC<IButton> = ({label, size = "large", color = "pink", onClick }) => {


  let buttonStyle: StyleProp<ViewStyle> = {
    backgroundColor: COLORS.PINK,
    width: horizontalPixel(300),
    height: verticalPixel(60),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }

  let textStyle: StyleProp<TextStyle> = {
    color: COLORS.WHITE,
    fontSize: fontPixel(24),
    textAlign: 'center',
  }
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onClick}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button;
