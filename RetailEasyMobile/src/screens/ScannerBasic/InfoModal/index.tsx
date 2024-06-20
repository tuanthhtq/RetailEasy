import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../utils/Normalizer.ts";
import { COLORS } from "../../../constants/Colors.ts";
import { getProductDetailService } from "../../../apis/public/public.services.ts";
import { ProductDetailDto } from "../../../apis/dto/productDetail.dto.ts";
import Divider from "../../../components/icons/Divider";
import Button from "../../../components/Button";


interface IInfoModal {
  isVisible?: boolean
  barCode: string
  onRequestClose: () => void
}


const InfoModal: React.FC<IInfoModal> = ({isVisible = false, ...props}) => {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<ProductDetailDto>()

  useEffect(() => {
    getProductDetailService(props.barCode)
      .then((response) => {
        if(response.data){
          setData(response.data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.log({err});
      })
  }, [props.barCode]);


  return (
    <Modal
      animationType='slide'
      visible = {isVisible}
      transparent={true}
      onRequestClose={props.onRequestClose}
    >
      <View style={style.modalBackground}>
        {isLoading ?
          <View><Text>Loading</Text></View> :
          <View style={style.content}>
            <Image
              source={{ uri: data?.productImage }}
              style={style.image}
              resizeMode={'contain'}
            />
            <ScrollView style={{flex: 1}}>
              <View style={style.main} >
                <View style={style.detail}>
                  <Text style={[style.text, {fontSize: 24}]}>{data?.productName}</Text>
                  <Text style={[style.text]}>{props.barCode}</Text>
                  <Text style={[style.text]}>{data?.price} VND</Text>
                  <Divider/>
                  <Text style={[style.text]}>Phân loại: {data?.category}</Text>
                  <Text style={[style.text]}>Còn lại: {data?.stock}</Text>
                  <Divider/>
                  <Text style={[style.text]}>Hãng sản suất: {data?.brand}</Text>
                  <Text style={[style.text]}>NSX: {data?.manufacturedDate}</Text>
                  <Text style={[style.text]}>HSD: {data?.expiry}</Text>
                  <Divider/>
                  <Text style={[style.text]}>Trạng thái: {data?.status ? "Sẵn có" : "Đã dừng bán"}</Text>

                </View>
                <Button onClick={props.onRequestClose} label={"Đồng ý"}/>
              </View>
            </ScrollView>
          </View>
        }

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
  content: {
    zIndex: 1,
    width: horizontalPixel(320),
    height: verticalPixel(650),
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: COLORS.PINK,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: horizontalPixel(320),
    height: verticalPixel(280),
    backgroundColor: COLORS.FADE
  },
  main: {
    flex: 1,
    width: horizontalPixel(300),
    height: verticalPixel(650 - 280),
    gap: 5,
    paddingVertical: verticalPixel(5),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  detail: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(16),
  }
})


export default InfoModal;
