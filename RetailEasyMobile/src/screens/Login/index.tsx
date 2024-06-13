import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ComplexInputField from "../../components/ComplexInputField";
import { COLORS } from "../../constants/Colors.ts";
import Button from "../../components/Button";
import { EmailRegex, PhoneRegex } from "../../constants/Regex.ts";

interface formData {
  phone: string,
  password: string,
  error: string
}

const Login = () => {
  const  {control, handleSubmit, formState: {errors}, setError} = useForm<formData>()
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data: formData) => {
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
              label={"Phone number"}
              name={"phone"}
              validatePhone
              control={control}
              errors={errors.phone ? errors.phone.message : ""}
            />
            <ComplexInputField
              label={"Password"}
              name={"password"}
              control={control}
              isPassword
              errors={errors.password ? errors.password.message : ""}

            />
          </View>
          <View style={style.action}>
            <Text style={style.loginRes}>{loginError}</Text>
            <Button label={"Login"} onClick={handleSubmit(onSubmit)}/>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    height: verticalPixel(420),
    width: horizontalPixel(300),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {

  },
  headingText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(28)
  },
  fields: {
    width: horizontalPixel(300),
    height: verticalPixel(200),
  },
  action: {
    width: horizontalPixel(300),
    height: verticalPixel(100),
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  loginRes: {
    color: COLORS.PINK,
    textAlign: 'center',
    fontSize: fontPixel(12),
    width: horizontalPixel(300)
  }
})

export default Login;
