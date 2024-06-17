import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";
import { COLORS } from "../../constants/Colors.ts";


interface IBillListItem {
  onClick: ()  => void
  orderId: number,
  orderDate: string,
  total: number,
  status: boolean
}

const  BillListItem: React.FC<IBillListItem> = ({...props}) => {


  return (
    <TouchableOpacity style={style.container}
      onPress={() => props.onClick()}
    >
      <View style={style.section}>
        <Text style={style.text}>{`Mã đơn: ${props.orderId}`}</Text>
        <Text style={style.text}>{`Ngày mua: ${props.orderDate}`}</Text>
      </View>
      <View style={style.section}>
        <Text style={style.text}>{`Tổng: ${props.total}`}</Text>
        <Text style={style.text}>{`${props.status ? "Đã thanh toán" : "Chưa thanh toán"}`}</Text>
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    width: horizontalPixel(320),
    height: verticalPixel(53),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.PINK,
    borderWidth: 0.5,
    borderRadius: 8,
    marginVertical: verticalPixel(5),
    paddingHorizontal: horizontalPixel(5)
  },
  section: {
    flexDirection: 'column',
    flex: 1
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(14)
  },

})

export default BillListItem
