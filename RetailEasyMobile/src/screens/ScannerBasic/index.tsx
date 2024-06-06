import { StyleProp, StyleSheet, Vibration, View, ViewStyle } from "react-native";
import { COLORS } from "../../constants/Colors.ts";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  Camera,
  Point,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useCodeScanner
} from "react-native-vision-camera";
import { horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";


const ScannerBasic = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [barcode, setBarcode] = useState("");
  const { hasPermission, requestPermission } = useCameraPermission();
  const [counter, setCounter] = useState(0)

  const cam = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const device = useCameraDevice('back')
  requestPermission()
    .then()
  useEffect(() => {
    setCameraActive(isFocused)
  }, [isFocused])

  const format = useCameraFormat(device, [
    { videoResolution: { width: 800, height: 800 } },
    { fps: 15}
  ])
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(codes[0].value, counter);
      console.log('>>>>>>');
      setCounter(c => c+1)
    }
  })



  useEffect(() => {
    if( counter === 10){
      setCameraActive(false);
      setCounter(0)
      setTimeout(() => {
        setCameraActive(true)
      }, 2000)
    }
  }, [counter]);

  return (
    <View style={style.container}>
      {(device && hasPermission) &&
        <Camera
          ref={cam}
          style={style.camera}
          codeScanner={codeScanner}
          device={device}
          isActive={cameraActive}
          format={format}
        />
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  camera: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: horizontalPixel(300),
    height: verticalPixel(300),
  }
})
export default ScannerBasic;
