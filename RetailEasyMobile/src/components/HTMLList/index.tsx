import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel } from "../../utils/Normalizer.ts";
import { COLORS } from "../../constants/Colors.ts";


interface IHTMLList{
  type?: "bullet" | "number" | "dash"
  heading: string
  listContent: string[]
}

const HTMLList: React.FC<IHTMLList> = ({type = "bullet", heading, listContent}) => {

  let start: ReactNode;
  if(type === "dash"){
    start = <Text style={{fontSize: fontPixel(20), color: COLORS.BLACK}}>-</Text>
  }
  if(type === "bullet"){
    start = <Text style={{fontSize: fontPixel(20), color: COLORS.BLACK}}>•</Text>
  }

  return (
    <View style={style.container}>
      <Text style={style.heading}>{heading}</Text>
      {
        listContent.map(item => (
          <View style={style.listItem} key={item}>
            <Text style={style.text}>{type === "number" ? (listContent.indexOf(item)+1) : start } {item}</Text>
          </View>
        ))
      }
    </View>
  )
}

const style  = StyleSheet.create({
  container: {

  },
  heading: {
    color: COLORS.BLACK,
    fontSize: fontPixel(24)
  },
  content: {

  },
  listItem: {
    marginLeft: horizontalPixel(10)
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18)
  }
})

export default HTMLList
