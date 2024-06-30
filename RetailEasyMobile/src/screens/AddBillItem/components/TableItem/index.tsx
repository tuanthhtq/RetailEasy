import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TrashBinIcon from "../../../../components/icons/TrashBinIcon";
import { COLORS } from "../../../../constants/Colors.ts";
import { horizontalPixel } from "../../../../utils/Normalizer.ts";


interface ITableItem {
  barcode: string
  no: number
  name: string,
  price: number,
  quantity?: number
  onDelete: (barcode: string) => void
}

const TableItem: React.FC<ITableItem> = ({quantity = 1,...props}) => {


  return (
    <View style={style.container}>
        <View style={[style.no, style.td]}><Text style={style.text}>{props.no}</Text></View>
        <View style={[style.name, style.td]}><Text style={[style.text, {width: '100%'}]}>{props.name}</Text></View>
        <View style={[style.qty, style.td]}><Text style={style.text}>{quantity}</Text></View>
        <View style={[style.price, style.td]}><Text style={style.text}>{props.price}</Text></View>
        <View style={[style.delete, style.td]} onTouchStart={() => props.onDelete(props.barcode)}><TrashBinIcon/></View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: horizontalPixel(340),

  },
  text: {
    color: COLORS.BLACK,
    textAlign: 'center'
  },
  td: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.PINK
  },
  no: {
    width: horizontalPixel(28)
  },
  name: {
    width: horizontalPixel(170)

  },
  qty: {
    width: horizontalPixel(28)
  },
  price: {
    width: horizontalPixel(90)

  },
  delete: {
    width: horizontalPixel(24)

  }
})

export default TableItem
