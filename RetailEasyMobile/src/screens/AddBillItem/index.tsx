import { ScrollView, StyleSheet, Text, Vibration, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import Button from "../../components/Button";
import { COLORS } from "../../constants/Colors.ts";
import { useEffect, useState } from "react";
import ScannerModal from "./components/ScannerModal";
import { ProductDetailDto } from "../../apis/dto/productDetail.dto.ts";
import { getProductDetailService } from "../../apis/public/public.services.ts";
import confirmSound from "../../utils/ConfirmSound.ts";
import { BillItems } from "../../mockingbin/MockData.ts";
import BillListItem from "../../components/BillListItem";
import TableItem from "./components/TableItem";


const AddBillItem = () => {
  const customerInfo = useSelector((state: IRootState) => state.billCustomer)

  const [total, setTotal] = useState(0)
  const [barcode, setBarcode] = useState('')
  const [scanMessage, setScanMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState<ProductDetailDto[] | []>(BillItems)

  const renderItem = () => {}

  //manual add
  const addManual = () => {

  }
  //scan
  const addScan = () => {
    setModalVisible(true)
  }
  //code scanned
  const onCodeScanned = (code: string) => {
    setBarcode(code)
  }

  //create
  const createBill = () => {

  }

  //close scan modal
  const onRequestClose = () => {
    setModalVisible(false)
  }

  //on remove item
  const removeItem = (name: string) => {

  }

  //get item info after scan barcode
  useEffect(() => {
    if(barcode) {
      getProductDetailService(barcode)
        .then((response) => {
          if(response.data) { //product exists
            confirmSound.playSound()
            setModalVisible(false)
            setScanMessage('')
          }else{ //product not exists
            setScanMessage(response.message)
          }
        })
        .catch((error) => {
          console.log({error});
        })
      setBarcode('')
    }
  }, [barcode])

  return (
    <View style={style.container}>
      <ScreenHeader label={"Thêm sản phẩm"}/>
      <ScannerModal
        isVisible={modalVisible}
        onClose={onRequestClose}
        onCodeScanned={(code: string) => onCodeScanned(code)}
        scanMessage={scanMessage}
      />
      <View style={style.content}>
        <View style={style.billItems}>
          <View style={style.tHead}>

          </View>
          <ScrollView
            style={{flex: 1}}
          >
            <View style={style.tBody}>
              {data && data.map((item : ProductDetailDto) =>
                <TableItem
                  no={data.indexOf(item) + 1}
                  name={item.productName}
                  price={item.price}
                  onDelete={(name: string) => removeItem(name)}
                />
              )}
            </View>
          </ScrollView>
        </View>

        <View style={style.info}>
          <View style={style.summary}>
            {(customerInfo.name || customerInfo.phone) && (
              <>
                <Text style={style.sumText}>Tên: {customerInfo.name}</Text>
                <Text style={style.sumText}>SĐT: {customerInfo.phone}</Text>
              </>
            )}
            <Text style={style.sumText}>Tổng: {total} </Text>
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
  billItems: {
    flexGrow: 1,
    borderWidth: 1,

  },
  tHead: {

  },
  tBody: {

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
