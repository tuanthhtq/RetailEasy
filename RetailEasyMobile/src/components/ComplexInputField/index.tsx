import React from "react";
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { Control, Controller } from "react-hook-form";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";

interface IComplexInputField{
  containerStyle?: StyleProp<ViewStyle>
  label: string,
  name: string,
  control: Control<any, any>,
  placeHolder?: string,
  required?: boolean,
  regex?: RegExp
}


const ComplexInputField: React.FC<IComplexInputField> = ({required = true,...props}) => {

  return (
    <View style={[style.container, props.containerStyle]}>
      <Text style={style.label}>{props.label}</Text>
      <Controller
        control={props.control}
        rules={{
          required: required && "This field is required",
          pattern: props.regex ? props.regex : new RegExp(/.*?/s)
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder={props.placeHolder ? props.placeHolder : ""}
            placeholderTextColor={COLORS.BLACK}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}

            style={style.input}
          />
        )}
        name={props.name}/>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: horizontalPixel(300),
    height: verticalPixel(66),

  },
  label: {
    color: COLORS.BLACK,
    fontSize: fontPixel(16)
  },
  input: {
    width: horizontalPixel(300),
    height: verticalPixel(40),
    borderWidth: 0.5,
    shadowColor: COLORS.PINK,
    shadowRadius: 4,
    shadowOffset: { width: 4 ,height: 4 },
    borderColor: COLORS.PINK,
    borderRadius: 8,
    color: COLORS.BLACK
  }

})

export default ComplexInputField;
