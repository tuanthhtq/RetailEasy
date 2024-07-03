import React from "react";
import { Modal, StyleSheet, View } from "react-native";


interface IBillInfoModal {
  orderId: number,
  onRequestClose: () => void
  isVisible?: boolean
}

const InfoModal: React.FC<IBillInfoModal> = ({...props}) => {


  return (
    <Modal
    >
      <View style={style.modalBackground}></View>
      <View style={style.content}>

      </View>

    </Modal>
  )
}

const style = StyleSheet.create({
  container: {

  },
  modalBackground: {

  },
  content: {

  }

})


export default InfoModal;
