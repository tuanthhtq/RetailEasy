import { StyleProp, Vibration, View, ViewStyle } from "react-native";
import { ReactNativeScannerView } from "@pushpendersingh/react-native-scanner";
import { COLORS } from "../../constants/Colors.ts";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";


const ScannerBasic = () => {
  const [camera, setCamera] = useState(false);
  const [barcode, setBarcode] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    setCamera(isFocused)
  }, [isFocused])

  const scannerStyle: StyleProp<ViewStyle> = {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: COLORS.WHITE
  }

  const containerStyle: StyleProp<ViewStyle> = {
  }


  useEffect(() => {
    Vibration.vibrate();
    console.log(barcode);
  }, [barcode]);

  return (
    <View style={containerStyle}>
      {camera &&
        <ReactNativeScannerView
          style={scannerStyle}
          onQrScanned={(value: any) => {
            if(value.nativeEvent.value && value.nativeEvent.value !== barcode){
              setBarcode(value.nativeEvent.value)
            }
          }}
        />
      }
    </View>
  )

}

export default ScannerBasic;
