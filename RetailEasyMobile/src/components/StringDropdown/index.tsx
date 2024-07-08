import React from "react";
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {fontPixel, horizontalPixel, verticalPixel} from "../../utils/Normalizer.ts";
import {COLORS} from "../../constants/Colors.ts";
import {Dropdown} from "react-native-element-dropdown";


interface IStringDropdown {
  label?: string
  defaultValue?: string
  onSelect: (value: string)=> void
  data: any[],
  customStyle?: StyleProp<ViewStyle>
}

const StringDropdown: React.FC<IStringDropdown> = ({...props}) => {

  return (
    <View style={[style.container, props.customStyle]}>
      {props.label && <Text style={style.label}>{props.label}:</Text>}
      <View style={style.listContainer}>
        <Dropdown
          data={props.data}
          valueField={"categoryName"}
          labelField={"categoryName"}
          onChange={(item)=>props.onSelect(item.categoryName)}
          placeholder={"Chọn 1"}
          placeholderStyle={style.listItem}
          selectedTextStyle={style.listItem}
        />

      </View>

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    height: verticalPixel(50),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: horizontalPixel(10),
    position: 'relative',
    paddingHorizontal: horizontalPixel(8),
    marginTop: verticalPixel(5)
  },
  label: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    textAlignVertical: 'center'
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    height: verticalPixel(50),
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    textAlignVertical: 'center',
    paddingHorizontal: horizontalPixel(5),
    borderColor: COLORS.PINK,
    borderWidth: 0.5,
    borderRadius: 8
  }
})

export default StringDropdown
