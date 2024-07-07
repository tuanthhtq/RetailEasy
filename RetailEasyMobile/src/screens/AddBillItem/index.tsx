import { ScrollView, StyleSheet, Text, Vibration, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import Button from "../../components/Button";
import { COLORS } from "../../constants/Colors.ts";
import React, { useEffect, useState } from "react";
import ScannerModal from "./components/ScannerModal";
import { ProductDetailDto } from "../../apis/dto/product.detail.dto.ts";
import { getProductDetailService } from "../../apis/public/public.services.ts";
import confirmSound from "../../utils/ConfirmSound.ts";
import { BillItems } from "../../mockingbin/MockData.ts";
import BillListItem from "../../components/BillListItem";
import TableItem from "./components/TableItem";
import TrashBinIcon from "../../components/icons/TrashBinIcon";
import { BillItemDto } from "../../apis/dto/bill.item.dto.ts";
import billListItem from "../../components/BillListItem";


const AddBillItem = () => {
  const customerInfo = useSelector((state: IRootState) => state.billCustomer)

  const [total, setTotal] = useState(0)
  const [barcode, setBarcode] = useState('')
  const [scanMessage, setScanMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState<BillItemDto[] | []>(BillItems)

  const renderItem = () => {
    return data.map((item : BillItemDto, index) =>
      <TableItem
        key={index}
        barcode={item.product.barcode}
        no={ index + 1}
        name={item.product.productName}
        quantity={item.quantity}
        price={item.product.price}
        onDelete={(barcode: string) => removeItem(barcode)}
      />
    )
  }

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
  const removeItem = (barcode: string) => {
    setData(current => {
      return current.filter(item => item.product.barcode !== barcode)
    })
  }

  //add to item list
  const addToList = (newItem: ProductDetailDto) => {
    data.map((item) => {
      if(item.product.barcode === newItem.barcode){
        // setData( current => {
        //   current.map((item => {
        //     if(item.product.barcode === newItem.barcode){
        //       return {
        //
        //       }
        //     }else{
        //       return item
        //     }
        //   }))
        // })

      }else{
        setData([
          ...data,
          {
            product: newItem,
            quantity: 1
          }
        ])
      }
    })
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
            //add to current list
            addToList(response.data)
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
            <View style={[style.no, style.td]}><Text style={style.text}>Stt</Text></View>
            <View style={[style.name, style.td]}><Text style={style.text}>Tên</Text></View>
            <View style={[style.qty, style.td]}><Text style={style.text}>SL</Text></View>
            <View style={[style.price, style.td]}><Text style={style.text}>Đơn giá</Text></View>
            <View style={[style.delete, style.td]}></View>
          </View>
          <ScrollView
            style={{flex: 1}}
          >
            <View style={style.tBody}>
              {data && renderItem()}
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
    borderRightWidth: 0.5,
    borderColor: COLORS.PINK,
    flexGrow: 1,
    paddingVertical: verticalPixel(10),
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  customerInfo: {

  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
  },
  billItems: {
    flexGrow: 1,

  },
  td: {
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: COLORS.PINK,
    paddingVertical: verticalPixel(1),
    paddingHorizontal: horizontalPixel(1),
  },
  tHead: {
    flexDirection: 'row',
    width: horizontalPixel(340)
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
