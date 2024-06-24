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
    { videoResolution: { width: 800, height: 800 } },
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

  return (
    <View style={style.container}>
      {
        state === CAMERA_STATE.PREPARE ?
          <View></View> :
          device &&
          <>
            <Camera
              ref={cameraRef}
              style={{
                position: 'absolute',
                width: horizontalPixel(300),
                height: horizontalPixel(300),
              }}
              codeScanner={codeScanner}
              device={device}
              isActive={state === CAMERA_STATE.ACTIVE && props.isFocused}
              format={format}
            />
            <Text style={style.text}>{props.tip}</Text>
          </>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: horizontalPixel(300),
    height: horizontalPixel(300),
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    textAlign: 'center'
  }
})

export default Scanner;
