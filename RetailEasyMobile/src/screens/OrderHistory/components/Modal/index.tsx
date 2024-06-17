import React from "react";
import { Modal, StyleSheet, View } from "react-native";


interface IInfoModal {
  orderId: number,
  onRequestClose: () => void
}

const InfoModal: React.FC<IInfoModal> = ({...props}) => {


  return (
    <Modal
      style={style.container}
      onRequestClose={}
    >

    </Modal>
  )
}

const style = StyleSheet.create({
  container: {

  },
  modalBackground: {

  },

})


export default InfoModal;
