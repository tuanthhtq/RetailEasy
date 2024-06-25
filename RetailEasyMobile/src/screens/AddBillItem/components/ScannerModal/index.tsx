import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Scanner from "../../../../components/Scanner";
import { useIsFocused } from "@react-navigation/native";
import { CAMERA_STATE } from "../../../../types/camera.state.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import { horizontalPixel } from "../../../../utils/Normalizer.ts";
import Button from "../../../../components/Button";


interface IScannerModal{
  isVisible: boolean
  onClose: () => void
  onCodeScanned: (code: string) => void
  scanMessage: string
}

const ScannerModal: React.FC<IScannerModal> = ({isVisible = false, ...props }) => {

  const [state, setState] = useState(CAMERA_STATE.PREPARE)
  const [scanMessage, setScanMessage] = useState(props.scanMessage)

  const isFocused = useIsFocused();

  const onCodeScanned = (code: string) => {
    props.onCodeScanned(code)
  }

  const onRequestClose = () => {
    props.onClose()
  }

  useEffect(() => {
    setScanMessage(props.scanMessage)
  }, [props.scanMessage])

  useEffect(() => {
    if(!scanMessage){
      setState(CAMERA_STATE.INACTIVE)
    }
  }, [scanMessage]);

  return (
    <Modal
      animationType='slide'
      visible={isVisible}
      transparent={true}
    >
      <View style={style.modalBackground}>
        <View style={style.content}>
          <Scanner
            state={state}
            isFocused={isFocused}
            onCodeScanned={(data: string) => onCodeScanned(data)}
            tip={scanMessage}
          />
          <Button onClick={onRequestClose} label={"Huỷ"} color={'pink'} />
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  modalBackground: {
    width: '100%',
    height: '100%',
    bottom: 0,
    backgroundColor: COLORS.MODAL,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: horizontalPixel(550),
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
})

export default ScannerModal;
