import React from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { Control, Controller, DeepRequired, FieldErrorsImpl, ValidationRule } from "react-hook-form";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import { EmailRegex, FullNameRegex, PhoneRegex } from "../../constants/Regex.ts";

export interface IComplexInputField extends TextInputProps{
  containerStyle?: StyleProp<ViewStyle>
  label: string,
  name: string,
  control: Control<any>,
  placeHolder?: string,
  required?: boolean,
  validatePhone?: boolean,
  validateEmail?: boolean,
  validateName?: boolean,
  isPassword?: boolean,
  errors?: string,
  maxLength: number,
  isTextarea?: boolean,
  defaultValue?: string,
}


const ComplexInputField: React.FC<IComplexInputField> = ({isTextarea = false, defaultValue = "", required = true, isPassword = false,...props}) => {

  let pattern: ValidationRule<RegExp> = new RegExp(/.*?/s);
  if(props.validateEmail) pattern = { value: EmailRegex, message: "Định dạng email không đúng" }
  if(props.validatePhone) pattern = { value: PhoneRegex, message: "Số điện thoại không hợp lệ" }
  if(props.validateName) pattern = { value: FullNameRegex, message: "Tên không hợp lệ" }

  return (
    <View style={[style.container, props.containerStyle, isTextarea && {
      height: verticalPixel(50) * 3,
    }]}>
      <Text style={style.label}>{props.label} {required && <Text style={{color: COLORS.PINK}}>*</Text>}</Text>
      <Controller
        control={props.control}
        rules={{
          required: required && "Trường này là bắt buộc",
          pattern: pattern
        }}
        defaultValue={defaultValue}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder={props.placeHolder ? props.placeHolder : ""}
            placeholderTextColor={COLORS.BLACK}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={isPassword}
            style={[style.input, isTextarea && {
              width: horizontalPixel(280),
              height: verticalPixel(40) * 3,
              textAlignVertical: "top"
            }]}
            maxLength={props.maxLength}
            multiline={isTextarea}
            numberOfLines={isTextarea ? 3 : 1}
          />
        )}
        name={props.name}/>
      {props.errors && <Text style={style.error}>{props.errors}</Text> }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: horizontalPixel(300),
    height: verticalPixel(90),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  label: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18)
  },
  input: {
    width: horizontalPixel(280),
    height: verticalPixel(45),
    borderWidth: 0.5,
    borderColor: COLORS.PINK,
    borderRadius: 8,
    color: COLORS.BLACK,
    alignSelf: 'center',
    fontSize: fontPixel(16),
    paddingHorizontal: horizontalPixel(8)

  },
  error: {
    fontSize: fontPixel(16),
    color: COLORS.PINK
  }

})

export default ComplexInputField;
