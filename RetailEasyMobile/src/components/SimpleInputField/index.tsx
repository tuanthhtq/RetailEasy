import React, { ReactNode } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SearchIcon from "../icons/SearchIcon";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";
import { COLORS } from "../../constants/Colors.ts";


interface ISimpleInputField{
  label?: string,
  onChange: (value: string) => void,
  rightIcon?: ReactNode
}

const SimpleInputField: React.FC<ISimpleInputField> = ({...props}) => {


  return (
    <View style={style.container}>
      <Text style={style.label}>{props.label}</Text>
      <View style={style.field}>
        <TextInput
          style={style.input}
          onChangeText={(value: string) => props.onChange(value)}
        />
        {props.rightIcon && props.rightIcon}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: horizontalPixel(320),
    height: verticalPixel(80),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  label: {
    color: COLORS.BLACK,
    fontSize: fontPixel(16)
  },
  field: {
    flexDirection: 'row',
  },
  input: {
    flexGrow: 1,
    borderRadius: 8,
    borderColor: COLORS.PINK,
    borderWidth: 1,
    color: COLORS.BLACK,
    paddingVertical: verticalPixel(5),
    fontSize: fontPixel(20)
  }
})

export default SimpleInputField;

