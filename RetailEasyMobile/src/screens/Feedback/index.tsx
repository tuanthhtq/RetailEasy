import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import ComplexInputField from "../../components/ComplexInputField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { COLORS } from "../../constants/Colors.ts";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface formData {
  phone: string,
  name: string,
  subject: string,
  message?: string,
  error: string
}

const Feedback = () => {

  const  {control, handleSubmit, formState: {errors}, setError} = useForm<formData>()
  const [loginError, setLoginError] = useState("");

  const onSendFeedback = (data: formData) => {
    console.log({data});
  }


  return (
    <View style={style.container}>
      <ScreenHeader label={"Phản hồi"}/>

        <View style={style.main}>

          <KeyboardAwareScrollView
            enableOnAndroid
            showsVerticalScrollIndicator={false}
          >
            <Text style={style.heading}>Hãy chia sẻ ý kiến của bạn</Text>
            <View style={style.fields}>
              <ComplexInputField
                label={"Họ tên"}
                name={"name"}
                control={control}
                validateName
                maxLength={100}
                errors={errors.name ? errors.name.message : ""}
              />
              <ComplexInputField
                label={"Số điện thoại"}
                name={"phone"}
                control={control}
                maxLength={15}
                validatePhone
                errors={errors.phone ? errors.phone.message : ""}
              />
              <ComplexInputField
                label={"Tiêu đề"}
                name={"subject"}
                control={control}
                errors={errors.subject ? errors.subject.message : ""}
                maxLength={100}
              />
              <ComplexInputField
                required={false}
                label={"Nội dung"}
                name={"message"}
                control={control}
                maxLength={500}
                errors={errors.message ? errors.message.message : ""}
                isTextarea
              />
              <Button
                onClick={handleSubmit(onSendFeedback)}
                label={"Gửi phản hồi"}
              />
            </View>
          </KeyboardAwareScrollView>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  form: {
    flex: 1,
    flexDirection: 'column',
  },
  heading: {
    fontSize: fontPixel(30),
    color: COLORS.BLACK
  },
  fields: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10
  }
})

export default Feedback
