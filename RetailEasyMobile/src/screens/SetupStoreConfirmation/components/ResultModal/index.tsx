import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import Button from "../../../../components/Button";
import { useAppDispatch } from "../../../../store/store.ts";


interface IResultModal{
  visible: boolean,
  onConfirm: ()=> void
}


const ResultModal: React.FC<IResultModal> = ({visible, onConfirm }) => {

  return (
    <Modal
    visible={visible}
    transparent={true}>
      <View style={style.modalBackground}>
        <View style={style.content}>
          <Text style={style.heading}>
            Khởi tạo thông tin thành công
          </Text>
          <Text>Đăng nhâp với mật khẩu là số điện thoại đã đăng ký</Text>
          <Button onClick={onConfirm} label={"Đến trang chủ"}/>
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
  content: {
    zIndex: 1,
    width: horizontalPixel(320),
    paddingVertical: verticalPixel(10),
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.PINK,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    color: COLORS.BLACK,
    fontSize: fontPixel(30),
    textAlign: 'center'
  }
})

export default ResultModal
