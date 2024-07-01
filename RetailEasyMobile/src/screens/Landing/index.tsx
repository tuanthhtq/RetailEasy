import { Linking, StyleSheet, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store/store.ts";
import { landing } from "../../store/public/public.action.ts";
import { checkStoreInfo } from "../../store/public/public.slice.ts";
import { COLORS } from "../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import MiniTile from "../../components/MiniTile";
import PhoneIcon from "../../components/icons/PhoneIcon";
import MailIcon from "../../components/icons/MailIcon";


const Landing = () => {

  const storeData = useSelector((state: IRootState) => state.public)

  const appDispatch = useAppDispatch();

  const call = (num: string) => {
    Linking.canOpenURL(`tel:${num}`)
      .then((able) => {
        if(able){
          Linking.openURL(`tel:${num}`)
            .then()
            .catch(() => {
              console.log('Failed to call');
            })
        }else {
          console.log('cannot mail');
        }
      })
  }
  const sendMail = (mail: string) => {
    Linking.canOpenURL(`mailto:${mail}`)
      .then((able) => {
        if(able){
          Linking.openURL(`mailto:${mail}`)
            .then()
        }else{
          console.log('cannot call');
        }
      })
  }

  useEffect(() => {
    appDispatch(checkStoreInfo())

    if(storeData.name === '' || storeData.address === '' || storeData.owner === '' || storeData.phoneNumber === '' ){
      appDispatch(landing())
    }
  }, [])


  return (
    <View style={styles.container}>
      <ScreenHeader backBtn={false} logo />
      <View style={styles.main}>
        <MiniTile text={`Cửa hàng tạp hoá ${storeData.name ? storeData.name : "N/A"}`} fontSize={30}/>
        <MiniTile text={`Địa chỉ: ${storeData.address ? storeData.address : "N/A"}`}/>
        <MiniTile text={`Chủ cửa hàng: ${storeData.owner ? storeData.owner : "N/A"}`}/>
        <MiniTile
          text={`Số điện thoại: ${storeData.phoneNumber ? storeData.phoneNumber : "N/A"}`}
          icon={storeData.phoneNumber && <PhoneIcon size={30}/>}
          onButtonClick={() => call(storeData.phoneNumber)}
        />
        {storeData.phoneNumber2 &&
          <MiniTile
            text={`Số điện thoại 2: ${storeData.phoneNumber2 ? storeData.phoneNumber2 : "N/A"}`}
            icon={storeData.phoneNumber2 && <PhoneIcon size={30}/>}
            onButtonClick={() => {
              if(storeData.phoneNumber2) call(storeData.phoneNumber2)
            }}
          /> }
        {storeData.email &&
          <MiniTile
            text={`Email: ${storeData.email ? storeData.email : "N/A"}`}
            icon={storeData.email && <MailIcon size={30}/>}
            onButtonClick={() => {
              if(storeData.email) sendMail(storeData.email);
            }}

          /> }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  main: {
    width: horizontalPixel(320)
  },
  text: {
    color: COLORS.WHITE,
    lineHeight: verticalPixel(40),
    borderWidth: 1
  },
  storeName: {
    fontSize: fontPixel((28))
  },
  subText: {
    fontSize: fontPixel((20))
  }
})

export default Landing;
