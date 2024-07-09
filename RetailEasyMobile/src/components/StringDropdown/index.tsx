import React, {useState} from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle
} from "react-native";
import {fontPixel, horizontalPixel, verticalPixel} from "../../utils/Normalizer.ts";
import {COLORS} from "../../constants/Colors.ts";
import {Dropdown} from "react-native-element-dropdown";
import Button from "../Button";
import {SimpleIdNameDto} from "../../apis/dto/simple.id.name.dto.ts";


interface IStringDropdown {
  label: string
  defaultValue?: string
  onSelect: (value: string)=> void
  data: SimpleIdNameDto[],
  customStyle?: StyleProp<ViewStyle>
}

const StringDropdown: React.FC<IStringDropdown> = ({...props}) => {

  const [isAdd, setIsAdd] = useState(false);
  const [value, setValue] = useState("Chọn 1")


  const onTextChange = (value: string) => {
    props.onSelect(value)
  }

  const onSelect = (item: SimpleIdNameDto) => {
    props.onSelect(item.name)
    setValue(item.name)
  }

  return (
    <View style={[style.container, props.customStyle]}>
      <Text style={style.label}>{props.label}:</Text>
      <View style={style.selection}>
        {isAdd ?
          <View style={style.listContainer}>
            <TextInput
              style={[style.listItem, {paddingHorizontal: horizontalPixel(5)}]}
              placeholder={"Tên"}
              onChangeText={(value: string) => onTextChange(value) }
            />
          </View> :
          <View style={style.listContainer}>
            <Dropdown
              value={value}
              search
              data={props.data}
              valueField={"name"}
              labelField={"name"}
              onChange={onSelect}
              placeholder={"Chọn 1"}
              placeholderStyle={style.listItem}
              selectedTextStyle={style.listItem}
            />
          </View>
        }
        <Button size={"square"} label={isAdd ? "Chọn" :"Thêm"} onClick={() => setIsAdd(!isAdd)}/>
      </View>


    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: horizontalPixel(10),
    position: 'relative',
    paddingHorizontal: horizontalPixel(8),
    marginTop: verticalPixel(5)
  },
  label: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    textAlignVertical: 'center'
  },
  selection: {
    flexDirection: 'row',
    columnGap: horizontalPixel(10)
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
