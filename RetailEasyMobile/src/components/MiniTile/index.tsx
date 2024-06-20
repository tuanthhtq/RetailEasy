import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/Colors.ts";
import { horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";

interface IMiniTile {
  text: string,
  fontSize?: number,
  icon?: ReactNode,
  onButtonClick?: () => void
}

const MiniTile: React.FC<IMiniTile> = ({text, icon, fontSize = 20,  onButtonClick = ()=>{}}) => {

  return (
    <View style={style.container}>
      <Text style={[style.text, {fontSize: fontSize}]}>{text}</Text>
      {icon && <TouchableOpacity style={style.icon} onPress={onButtonClick}>{icon && icon}</TouchableOpacity>}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    paddingVertical: verticalPixel(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    color: COLORS.BLACK,
    lineHeight: verticalPixel(40),
    flex: 1
  },
  icon: {
    paddingVertical: verticalPixel(5),
    paddingHorizontal: horizontalPixel(5)
  }

})

export default MiniTile;
