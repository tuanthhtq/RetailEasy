import React, { useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/store.ts";
import ComplexInputField from "../../../components/ComplexInputField";
import Button from "../../../components/Button";
import { COLORS } from "../../../constants/Colors.ts";
import { horizontalPixel, verticalPixel } from "../../../utils/Normalizer.ts";
import { clearBillCustomerInfo, setBillCustomerInfo } from "../../../store/bill/bill.slice.ts";


interface IGetInfoModal{
  isVisible: boolean
  onContinue: ()=> void
  onClose: ()=> void
}

interface formData {
  customerName: string
  customerPhone: string
}

const GetInfoModal: React.FC<IGetInfoModal> =({isVisible = false, ...props}) => {

  const  {control, handleSubmit, formState: {errors}, setError, reset} = useForm<formData>()

  const appDispatch = useAppDispatch();

  const onSubmit = (data: formData) => {
    appDispatch(setBillCustomerInfo({id: 1, phone: data.customerPhone, name: data.customerName, billItems: []}))
    props.onContinue()
  }
  const onSubmitWithoutData = () => {
    props.onContinue()
  }

  useEffect(() => {
    if(isVisible){
      appDispatch(clearBillCustomerInfo())
      control._reset()
      console.log();
      reset(control._formValues)
    }
  }, [isVisible])

  return (
    <Modal
      animationType='fade'
      visible = {isVisible}
      transparent={true}
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
              errors={errors.customerName ? errors.customerName.message : "" }
            />
            <ComplexInputField
              label={"Số điện thoại"}
              name={"customerPhone"}
              control={control}
              maxLength={15}
              validatePhone
              errors={errors.customerPhone ? errors.customerPhone.message : "" }
            />
          </View>
          <View style={style.action}>
            <Button size={"small"} color={"pink"} onClick={props.onClose} label={"Quay lại"}/>
            <Button size={"small"} onClick={() => onSubmitWithoutData()} label={"Bỏ qua"}/>
            <Button size={"small"} onClick={handleSubmit(onSubmit)} label={"Tiếp tục"}/>
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
    flexGrow: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  action: {
    width: horizontalPixel(320),
    flexDirection: "row",
    justifyContent: "space-evenly",
  }
})

export default GetInfoModal
