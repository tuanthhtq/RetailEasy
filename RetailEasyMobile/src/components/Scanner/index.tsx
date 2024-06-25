import { CAMERA_STATE } from "../../types/camera.state.ts";
import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useCodeScanner
} from "react-native-vision-camera";
import { StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel } from "../../utils/Normalizer.ts";
import { COLORS } from "../../constants/Colors.ts";


interface IScanner {
  state: CAMERA_STATE
  isFocused: boolean,
  tip?: string
  onCodeScanned: (code: string)=>void
}

const Scanner: React.FC<IScanner> = ({...props}) => {
  const [state, setState] = useState(props.state);
  const [scanned, setScanned] = useState([]);
  const [isFocused, setIsFocused] = useState(props.isFocused);

  const {hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);

  const device = useCameraDevice('back')

  //max scan
  const MAX_SCAN = 5;

  //camera format configuration
  const format = useCameraFormat(device, [
    { videoResolution: { width: 1000, height: 1000 }, autoFocusSystem: "phase-detection", fps: 30 },
  ])

  //code scanner handler
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if(scanned && scanned.length < MAX_SCAN) {
        if(codes.length === 1){
          // @ts-ignore
          setScanned([...scanned, codes[0].value])
        }
      }else{
        setState(CAMERA_STATE.INACTIVE)
      }
    }
  })

  //find most occurred code to prevent wrong code
  const mostFrequent = (arr: string[]) => {

    const frequencyMap: { [key: string]: number } = {};
    let maxCount = 0;
    let mostFrequentElement = '';

    for (const item of arr) {
      frequencyMap[item] = (frequencyMap[item] || 0) + 1;
      if (frequencyMap[item] > maxCount) {
        maxCount = frequencyMap[item];
        mostFrequentElement = item;
      }
    }

    return mostFrequentElement;
  };

  const onCameraLoaded = () => {

  }

  //update focus state
  useEffect(() => {
    setIsFocused(props.isFocused)
  }, [props.isFocused])

  //update camera state
  useEffect(() => {
    setState(props.state)
  }, [props.state])

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
  }, [isFocused])

  //set camera state
  useEffect(() => {
    if(props.isFocused && hasPermission && device){

      //start camera 0.5s after initialize parent screen
      const timeout = setTimeout(() => {
        setState(CAMERA_STATE.ACTIVE)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [isFocused, hasPermission, device]);

  //return value
  useEffect(() => {
    if(scanned && scanned.length === MAX_SCAN){
      setScanned([])
      props.onCodeScanned(mostFrequent(scanned))
    }
  }, [scanned]);

  return (state !== CAMERA_STATE.PREPARE && device) ? (
    <View style={style.camera}>
      <Camera
        onLayout={onCameraLoaded}
        ref={cameraRef}
        style={{
          width: horizontalPixel(300),
          height: horizontalPixel(300)
        }}
        codeScanner={codeScanner}
        device={device}
        isActive={state === CAMERA_STATE.ACTIVE && props.isFocused}
        format={format}
      />
      <Text style={style.text}>{props.tip}</Text>
    </View>
  ) :
    <View></View>
}

const style = StyleSheet.create({
  camera: {
    width: horizontalPixel(300),
    height: horizontalPixel(350),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.WHITE
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    textAlign: 'center'
  }
})

export default Scanner;
