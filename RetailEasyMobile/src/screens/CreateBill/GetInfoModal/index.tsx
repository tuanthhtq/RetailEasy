import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/store.ts";
import ComplexInputField from "../../../components/ComplexInputField";
import Button from "../../../components/Button";
import { COLORS } from "../../../constants/Colors.ts";
import { horizontalPixel, verticalPixel } from "../../../utils/Normalizer.ts";


interface IGetInfoModal{
  isVisible: boolean
  onSkip: ()=> void
  onNext: ()=> void
}

interface formData {
  customerName: string
  customerPhone: string
}

const GetInfoModal: React.FC<IGetInfoModal> =({isVisible = false, ...props}) => {

  const  {control, handleSubmit, formState: {errors}} = useForm<formData>()

  const appDispatch = useAppDispatch();

  const onSubmit = (data: formData) => {
    console.log({data});
    console.log(1);
  }

  const onRequestClose = (skip?: boolean) => {
    handleSubmit(onSubmit)
    if (skip) props.onSkip()
    else props.onNext()
  }

  return (
    <Modal
      animationType='fade'
      visible = {isVisible}
      transparent={true}
      onRequestClose={() => onRequestClose(false)}
    >
      <View style={style.modalBackground}>
        <View style={style.modalContent}>
          <View style={style.main}>
            <ComplexInputField
              label={"Tên khách hàng"}
              name={"customerName"}
              control={control}
              maxLength={100}
              validateName
            />
            <ComplexInputField
              label={"Số điện thoại"}
              name={"customerPhone"}
              control={control}
              maxLength={15}
              validatePhone
            />
          </View>
          <View style={style.action}>
            <Button size={"small"} color={"pink"} onClick={() => onRequestClose(true)} label={"Quay lại"}/>
            <Button size={"small"} onClick={() => onRequestClose(true)} label={"Bỏ qua"}/>
            <Button size={"small"} onClick={() => onRequestClose(false)} label={"Tiếp tục"}/>
          </View>
        </View>
      </View>


    </Modal>
  )
}

const style = StyleSheet.create({
  modalBackground: {
    width: horizontalPixel(360),
    height: '100%',
    backgroundColor: COLORS.MODAL,
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  modalContent: {
    zIndex: 1,
    width: horizontalPixel(320),
    height: verticalPixel(350),
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: COLORS.PINK,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden'
  },
  main: {
    flexGrow: 0.7
  },
  action: {
    width: horizontalPixel(320),
    flexDirection: "row",
    justifyContent: "space-evenly",
  }
})

export default GetInfoModal
