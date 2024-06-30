import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";


interface IPopupNotification {
  label: string
  visible: boolean
}

const PopupNotification: React.FC<IPopupNotification> = ({label, visible}) => {

  return (
    <Modal
      animationType={"slide"}
      transparent
      visible={visible}
    >
      <View style={style.container}>
        <Text style={style.text}>{label}</Text>
      </View>
    </Modal>
  )
}
const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    top: 10,
    width: horizontalPixel(320),
    alignSelf: 'center',
    paddingVertical: verticalPixel(5),
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.PINK,
    zIndex: 0,
  },
  text: {
    fontSize: fontPixel(20),
    color: COLORS.BLACK,
    textAlign: 'center'
  }
})

export default PopupNotification;
