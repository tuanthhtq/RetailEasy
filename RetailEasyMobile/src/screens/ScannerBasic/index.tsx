import { StyleSheet, Vibration, View } from "react-native";
import React, { useEffect, useState } from "react";
import {  useIsFocused } from "@react-navigation/native";
import { horizontalPixel } from "../../utils/Normalizer.ts";
import ScreenHeader from "../../components/ScreenHeader";
import InfoModal from "./components/InfoModal";
import Scanner from "../../components/Scanner";

enum CAMERA_STATE {
  PREPARE,
  ACTIVE,
  INACTIVE
}

const ScannerBasic = () => {

  const [cameraState, setCameraState] = useState(CAMERA_STATE.PREPARE)
  const [barcode, setBarcode] = useState("");
  const [modalVisible, setModalVisible] = useState(false)

  const isFocused = useIsFocused();

  //close modal
  const onCloseModal = () => {
    setModalVisible(false);
    setBarcode('')
    const timeout = setTimeout(() => {
      setCameraState(CAMERA_STATE.ACTIVE)
    }, 500)
    return () => clearTimeout(timeout);
  }

  //open modal on code scanned
  useEffect(() => {
    if(barcode){
      setModalVisible(true)
      setCameraState(CAMERA_STATE.INACTIVE)
    }
  }, [barcode]);


  return (
    <View style={style.container}>
      <InfoModal
        barCode={barcode}
        isVisible={modalVisible}
        onRequestClose={onCloseModal}
      />
      <ScreenHeader label={"Thông tin sản phẩm"} backBtn={false} />
      <View style={style.content}>
        <Scanner
          state={cameraState}
          isFocused={isFocused}
          onCodeScanned={(data: string)=> setBarcode(data)}
          tip={'Hướng camera vào mã vạch để xem thông tin sản phẩm'}
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: horizontalPixel(300),
    height: horizontalPixel(350),
  },
})
export default ScannerBasic;
