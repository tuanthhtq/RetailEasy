import { StyleProp, StyleSheet, Text, useWindowDimensions, Vibration, View, ViewStyle } from "react-native";
import { COLORS } from "../../constants/Colors.ts";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  Camera,
  Point,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useCodeScanner
} from "react-native-vision-camera";
import { fontPixel, horizontalPixel, SCREEN_HEIGHT, SCREEN_WIDTH, verticalPixel } from "../../utils/Normalizer.ts";
import ScreenHeader from "../../components/ScreenHeader";
import InfoModal from "./InfoModal";

enum CAMERA_STATE {
  PREPARE,
  ACTIVE,
  INACTIVE
}

const ScannerBasic = () => {

  const [cameraState, setCameraState] = useState(CAMERA_STATE.PREPARE)
  const [barcode, setBarcode] = useState("");
  const [modalVisible, setModalVisible] = useState(false)

  const {hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);

  const isFocused = useIsFocused();
  const device = useCameraDevice('back')

  //camera format configuration
  const format = useCameraFormat(device, [
    { videoResolution: { width: 800, height: 800 } },
  ])

  //close modal
  const onCloseModal = () => {
    setModalVisible(false);
    const timeout = setTimeout(() => {
      setCameraState(CAMERA_STATE.ACTIVE)

    }, 500)
    return () => clearTimeout(timeout);
  }

  //code scanner handler
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if(codes[0].value === '8935001800354'){
        setBarcode('8935001800354');
        setCameraState(CAMERA_STATE.INACTIVE)
      }
    }
  })

  useEffect(() => {
  })

  //acquire camera permission
  useEffect(() => {
    if(!hasPermission){
      requestPermission()
        .then((res) => {
          console.log("Camera permission granted");
        })
        .catch((err) => {
          console.log("Cannot acquire camera permission");
        })

    }
  }, [])

  //set camera state
  useEffect(() => {
    if(isFocused && hasPermission && device){
      const a = setTimeout(() => {
        setCameraState(CAMERA_STATE.ACTIVE)
      }, 500)
      return () => clearTimeout(a)
    }
  }, [isFocused, hasPermission, device]);

  //get barcode
  useEffect(() => {
    if(barcode !== "" && cameraState !== CAMERA_STATE.ACTIVE){
      setModalVisible(true)
    }

  }, [cameraState, barcode])

  useEffect(() => {
    console.log(cameraState === CAMERA_STATE.ACTIVE && isFocused);
  });
  return (
    <View style={style.container}>
      <InfoModal
        barCode={barcode}
        isVisible={modalVisible}
        onRequestClose={onCloseModal}
      />
      <ScreenHeader label={"Quét mã sản phẩm"} backBtn={false} />
      <View style={style.content}>
        <View style={style.camera}>
          {
            cameraState === CAMERA_STATE.PREPARE ?
              <View></View> :
              device &&
              <Camera
                ref={cameraRef}
                style={{

                  position: 'absolute',
                  width: horizontalPixel(300),
                  height: horizontalPixel(300),
                  top: 0
                }}
                codeScanner={codeScanner}
                device={device}
                isActive={cameraState === CAMERA_STATE.ACTIVE && isFocused}
                format={format}
              />
          }
        </View>
        <View ><Text style={style.description}>Hướng camera vào mã vạch để xem thông tin sản phẩm</Text></View>
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
    position: 'relative'
  },
  camera: {
    width: horizontalPixel(300),
    height: horizontalPixel(350),
  },
  description: {
    color: COLORS.BLACK,
    fontSize: fontPixel(16)
  }
})
export default ScannerBasic;
