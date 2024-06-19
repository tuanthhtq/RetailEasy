import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import { useForm } from "react-hook-form";
import ComplexInputField from "../../components/ComplexInputField";
import { COLORS } from "../../constants/Colors.ts";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authentication/auth.action.ts";
import { IRootState } from "../../store/store.ts";

interface formData {
  phone: string,
  password: string,
  error: string
}

const Login = () => {
  const message = useSelector((state: IRootState) => state.auth)

  const  {control, handleSubmit, formState: {errors}, setError} = useForm<formData>()
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();



  const onSubmit = (credentials: formData) => {
    // @ts-ignore
    dispatch(login(credentials))
  }

  useEffect(() => {
    if(message.message){
      setLoginError(message.message);
      setTimeout(() => {
        setLoginError('');
      }, 5000)
    }
  }, [message]);

  return (
    <View style={style.container}>
      <ScreenHeader label={"Đăng nhập"}/>
      <View style={style.main}>
        <View style={style.form}>
          <View style={style.heading}>
            <Text style={style.headingText}>Điền thông tin đăng nhập để tiếp tục</Text>
          </View>
          <View style={style.fields}>
            <ComplexInputField
              label={"Số điện thoại"}
              name={"phone"}
              validatePhone
              control={control}
              errors={errors.phone ? errors.phone.message : ""}
              maxLength={15}
            />
            <ComplexInputField
              label={"Mật khẩu"}
              name={"password"}
              control={control}
              isPassword
              errors={errors.password ? errors.password.message : ""}
              maxLength={255}
            />
          </View>
          <View style={style.action}>
            <Text style={style.loginRes}>{loginError}</Text>
            <Button label={"Đăng nhập"} onClick={handleSubmit(onSubmit)}/>
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
    fontSize: fontPixel(28),
    fontWeight: "bold"
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
    fontSize: fontPixel(16),
    width: horizontalPixel(300)
  }
})

export default Login;
