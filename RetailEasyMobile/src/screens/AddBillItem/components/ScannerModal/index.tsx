import React, { FC, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Scanner from "../../../../components/Scanner";
import { useIsFocused } from "@react-navigation/native";
import { CAMERA_STATE } from "../../../../types/camera.state.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import { horizontalPixel } from "../../../../utils/Normalizer.ts";


interface IScannerModal{
  isVisible: boolean
}

const ScannerModal: React.FC<IScannerModal> = ({isVisible = false}) => {

  const [state, setState] = useState(CAMERA_STATE.PREPARE)

  const isFocused = useIsFocused();

  const onCodeScanned = (code: string) => {
    console.log(code);
  }


  return (
    <Modal
      animationType='fade'
      visible={isVisible}
      transparent={true}
    >
      <View style={style.modalBackground}>
        <View style={style.content}>
          <Scanner state={state} isFocused={isFocused} onCodeScanned={(data: string) => onCodeScanned(data)}/>
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  modalBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.MODAL,
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 10
  },
  modalContainer: {

  },
  content: {
  },
  main: {

  }
})

export default ScannerModal;
