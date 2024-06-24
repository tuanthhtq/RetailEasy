import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import Button from "../../components/Button";
import { COLORS } from "../../constants/Colors.ts";
import { useState } from "react";


const AddBillItem = () => {
  const customerInfo = useSelector((state: IRootState) => state.billCustomer)

  const [total, setTotal] = useState(0)

  const renderItem = () => {}

  //manual add
  const addManual = () => {

  }
  //scan
  const addScan = () => {

  }
  //create
  const createBill = () => {

  }

  return (
    <View style={style.container}>
      <ScreenHeader label={"Thêm sản phẩm"}/>
      <View style={style.content}>
        <View style={style.list}>

        </View>
        <View style={style.info}>
          <View style={style.summary}>
            {(customerInfo.name || customerInfo.phone) && (
              <>
                <Text style={style.sumText}>Khách hàng: {customerInfo.name}</Text>
                <Text style={style.sumText}>SĐT: {customerInfo.phone}</Text>
              </>
            )}
            <Text style={style.sumText}>Total: {total} </Text>
          </View>
          <View style={style.action}>
            <Button size={'small'} onClick={addManual} label={"Thủ công"} />
            <Button size={'small'} onClick={addScan} label={"Quét mã"} />
            <Button size={'small'} color={"pink"} onClick={createBill} label={"Tạo đơn"} />
          </View>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "space-between"
  },
  content: {
    width: horizontalPixel(340),
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.PINK,
    flexGrow: 1,
    paddingVertical: verticalPixel(10),
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  customerInfo: {

  },
  text: {

  },
  list: {
    flexGrow: 1,
  },
  info: {
    gap: 5
  },
  summary: {
  },
  sumText: {
    fontSize: fontPixel(24),
    color: COLORS.BLACK,
    width: horizontalPixel(300),
    alignSelf: 'center'
  },
  action: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    paddingVertical: verticalPixel(5)
  }
})

export default AddBillItem
