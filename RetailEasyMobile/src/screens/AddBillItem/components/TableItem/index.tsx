import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TrashBinIcon from "../../../../components/icons/TrashBinIcon";
import { COLORS } from "../../../../constants/Colors.ts";


interface ITableItem {
  no: number
  name: string,
  price: number,
  quantity?: number
  onDelete: (name: string) => void
}

const TableItem: React.FC<ITableItem> = ({quantity = 1,...props}) => {


  return (
    <View style={style.container}>
        <View style={style.no}><Text style={style.text}>{props.no}</Text></View>
        <View style={style.name}><Text style={style.text}>{props.name}</Text></View>
        <View style={style.qty}><Text style={style.text}>{quantity}</Text></View>
        <View style={style.price}><Text style={style.text}>{props.price}</Text></View>
        <View style={style.delete} onTouchEnd={() => props.onDelete(props.name)}><TrashBinIcon/></View>
    </View>
  )
}

const style  = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1
  },
  text: {
    color: COLORS.BLACK
  },
  no: {

  },
  name: {

  },
  qty: {

  },
  price: {

  },
  delete: {

  }
})

export default TableItem
