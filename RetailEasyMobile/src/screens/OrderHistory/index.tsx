import { FlatList, StyleSheet, Text, View } from "react-native";
import { horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import ScreenHeader from "../../components/ScreenHeader";
import SimpleInputField from "../../components/SimpleInputField";
import { useState } from "react";
import { COLORS } from "../../constants/Colors.ts";
import { getBillsByPhone } from "../../mockingbin/api/mock-api.ts";
import { BillsDto } from "../../apis/dto/bills.dto.ts";
import BillListItem from "../../components/BillListItem";


const OrderHistory = () => {
  const [billList, setBillList] = useState<BillsDto[]>()
  const [modalVisible, setModalVisible] = useState(false)


  const onChange = (value: string) => {
    setBillList(getBillsByPhone(value))
  }
  const onBillClick = (billId: number) => {
    console.log(billId);
  }


  return (
    <View style={style.container}>
      <ScreenHeader label={"Lịch sử mua hàng"}/>
      <View style={style.main}>
        <View style={style.searchBox}>
          <SimpleInputField label={"Nhập số điện thoại"} onChange={onChange} />
        </View>
        <View style={style.listContainer}>
          {
            billList && billList?.length === 0 ?
            <Text style={{fontSize: 30, color: COLORS.BLACK, textAlign: "center"}}>Không tìm thấy đơn hàng</Text>:
            <View style={style.billList}>
              <FlatList
                data={billList}
                renderItem={ ({item}) =>
                  <BillListItem
                    orderId={item.billId}
                    orderDate={item.createdDate}
                    onClick={() => onBillClick(item.billId)}
                    status={item.status}
                    total={item.total}
                    key={item.billId}
                  />
                }
              />
            </View>
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
  },
  billList: {

  }
})

export default OrderHistory;
