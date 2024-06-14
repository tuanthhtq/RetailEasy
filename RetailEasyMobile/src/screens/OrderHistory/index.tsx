import { StyleSheet, Text, View } from "react-native";
import { horizontalPixel, verticalPixel } from "../../utils/Normalizer.tsx";
import ScreenHeader from "../../components/ScreenHeader";
import SimpleInputField from "../../components/SimpleInputField";
import { useState } from "react";
import { COLORS } from "../../constants/Colors.ts";


const OrderHistory = () => {
  const [searchRes, setSearchRes] = useState<string>()


  const onChange = (value: string) => {
    setSearchRes(value)
  }


  return (
    <View style={style.container}>
      <ScreenHeader label={"Lịch sử mua hàng"}/>
      <View style={style.main}>
        <View style={style.searchBox}>
          <SimpleInputField label={"Nhập số điện thoại"} onChange={onChange} />
        </View>
        <View style={style.listContainer}>
          {!searchRes ?
          <Text style={{fontSize: 30, color: COLORS.BLACK, textAlign: "center"}}>Không tìm thấy đơn hàng</Text>:
          <Text style={{fontSize: 30, color: COLORS.BLACK, textAlign: "center"}}>{searchRes}</Text>
          }
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  main: {
    width: horizontalPixel(320),
    height: verticalPixel(624),
    marginTop: verticalPixel(15),
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  searchBox: {

  },
  listContainer: {
    flex: 1
  }
})

export default OrderHistory;
