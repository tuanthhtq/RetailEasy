import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ComplexInputField from "../../components/ComplexInputField";
import { COLORS } from "../../constants/Colors.ts";

interface formData {
  emailOrPhone: string,
  password: string,
  error: string
}

const Login = () => {
  const  {register, control, handleSubmit, formState: {errors}, setError} = useForm<formData>()

  const onSubmit: SubmitHandler<formData> = (data) => {
    console.log({ data });
  }

  return (
    <View style={style.container}>
      <ScreenHeader label={"Login"}/>
      <View style={style.main}>
        <View style={style.form}>
          <View style={style.heading}>
            <Text style={style.headingText}>Enter credentials to continue</Text>
          </View>
          <View style={style.fields}>
            <ComplexInputField
              label={"Email or phone number"}
              name={"emailOrPhone"}
              control={control}
            />
            <ComplexInputField
              label={"Password"}
              name={"password"}
              control={control}
            />
          </View>
          <View>
          </View>
        </View>

      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    width: horizontalPixel(320),
    height: verticalPixel(624),
    marginTop: verticalPixel(15),
    flexDirection: 'column',
    justifyContent: 'center'
  },
  form: {
    height: verticalPixel(420),
    width: horizontalPixel(300),
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  heading: {

  },
  headingText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(28)
  },
  fields: {
    width: horizontalPixel(300),
    height: verticalPixel(66),
  }
})

export default Login;
