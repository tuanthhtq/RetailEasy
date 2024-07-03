import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../../../components/ScreenHeader";
import { useEffect, useState } from "react";
import { getSupplier } from "../../../../mockingbin/api/mock-api.ts";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store.ts";
import { SupplierDto } from "../../../../apis/dto/supplier.dto.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import Button from "../../../../components/Button";
import { formatMoney } from "../../../../utils/Formater.ts";
import { ProductSimpleDto } from "../../../../apis/dto/product.simple.dto.ts";
import AddGoodsModal from "../../components/AddGoodsModal";

export interface IImportItem {
  productId: number,
  name: string,
  price: number,
  quantity: number,
  isReturn: boolean
}

const AddImportItem = () => {

  const {name, phone} = useSelector((state: IRootState) => state.supplier)

  const [supplier, setSupplier] = useState<SupplierDto | undefined>();
  const [items, setItems] = useState<IImportItem[]>([]);
  const [moneyPay, setMoneyPay] = useState(0)
  const [moneyReturn, setMoneyReturn] = useState(0)

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"import" | "return">("import")

  //open modal
  const openModal = () => {
    setModalVisible(true)
  }

  //click add
  const addGoods = () => {
    setModalType("import");
    openModal()
  }

  //click return
  const returnGoods = () => {
    setModalType("return")
    openModal()
  }


  //click cancel add
  const onCancel  = () => {
    setModalVisible(false)
  }

  //click confirm add
  const onConfirm = (item: ProductSimpleDto) => {

    setModalVisible(false)
  }

  //on next step
  const onNext = () => {

  }

  //get supplier detail
  useEffect(() => {
    if(phone){
      const data = getSupplier(phone);
      if(data){
        setSupplier(data)
      }
    }
  }, []);



  //calculate total money
  useEffect(() => {
    if(items){
      let returnMoney = 0;
      let payMoney = 0;

      for (const item of items) {
        if(item.isReturn){
          returnMoney += item.quantity * item.price
        }else{
          payMoney += item.quantity * item.price
        }
      }
      setMoneyPay(payMoney)
      setMoneyReturn(returnMoney)
    }
  }, [items]);

  return (
    <View style={style.container}>
      <ScreenHeader label={"Thêm sản phẩm"} />
      <View style={style.main}>
        <AddGoodsModal
          visible={modalVisible}
          type={modalType}
          onCancel={onCancel}
          onConfirm={(item: ProductSimpleDto) => onConfirm(item)}
        />
        <View style={style.supplier}>
          <Text style={style.supplierHeading}>Thông tin nhà cung cấp</Text>
          <Text style={style.text}>Tên: {supplier ? supplier.name : "N/A"}</Text>
          <Text style={style.text}>Số điện thoại: {supplier ? supplier.phoneNumber : "N/A"}</Text>
          {(supplier && supplier.email) &&  <Text style={style.text}>Email: {supplier.email}</Text>}
          {(supplier && supplier.address) &&  <Text style={style.text}>Địa chỉ: {supplier.address}</Text>}
        </View>
        <View style={style.options}>
          <Button onClick={returnGoods} label={"Trả hàng"} size={"medium"} color={"pink"} />
          <Button onClick={addGoods} label={"Nhập hàng"} size={"medium"} />
        </View>
        <View style={style.listContainer}>

        </View>
        <View style={style.summary}>
          <View style={style.info}>
            <Text style={style.infoText}>Tiền hoàn về: {formatMoney(moneyReturn)}</Text>
            <Text style={[style.infoText, {borderBottomWidth: 0.5, borderBottomColor: COLORS.PINK}]}>Tiền mua hàng: {formatMoney(moneyPay)}</Text>
            <Text style={style.infoText}>Tiền trả: {formatMoney(moneyPay - moneyReturn)}</Text>
          </View>
          <View style={style.action}>
            <Button onClick={onCancel} label={"Hủy"} size={"medium"} color={"pink"}/>
            <Button onClick={onNext} label={"Tiếp tục"} size={"medium"} />
          </View>
        </View>
      </View>
    </View>
  )
}


const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',

  },
  main: {
    width: horizontalPixel(340),
    gap: verticalPixel(10),
    flexGrow: 1,
    paddingVertical: verticalPixel(14),

  },
  supplier: {

  },
  supplierHeading: {
    color: COLORS.BLACK,
    fontSize: fontPixel(24)
  },
  text: {
    color: COLORS.BLACK,
    fontSize: fontPixel(20)
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  listContainer: {
    flexGrow: 1,
    width: horizontalPixel(340),
  },
  summary: {
    flexDirection: 'row',
  },
  info: {
    flexGrow: 1
  },
  infoText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18)
  },
  action: {
    flexDirection: 'column',
    gap: verticalPixel(5)
  }

})
export default AddImportItem
