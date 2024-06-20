import React, { ReactNode, useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";


interface ITextModal{
  isVisible?: boolean
  icon?: ReactNode
  text: string
  button?: ReactNode
  onRequestClose: ()=>void
}

const TextModal: React.FC<ITextModal> = ({isVisible = false, ...props}) => {

  useEffect(() => {
    if(!props.button){
      setTimeout(() => {
        props.onRequestClose()
      }, 3000)
    }
  }, []);

  return (
    <Modal
      animationType='slide'
      visible = {isVisible}
      transparent={true}
      onRequestClose={props.onRequestClose}
    >
      <View style={style.modalBackground}>
        <View style={style.modalContent}>
          <View style={style.main}>
            {props.icon && <View style={style.icon}>{props.icon}</View>}
            <Text style={style.text}>{props.text}</Text>
          </View>
          {props.button && props.button}
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
    height: verticalPixel(370),
    paddingVertical: verticalPixel(10),
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.PINK,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  main: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 0.7
  },
  icon: {
    height: verticalPixel(280),
    borderWidth: 1
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(32),
    textAlign: 'center'
  }
})

export default TextModal
