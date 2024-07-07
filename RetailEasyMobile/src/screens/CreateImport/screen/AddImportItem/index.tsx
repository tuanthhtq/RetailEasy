import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../../../components/ScreenHeader";
import { useEffect, useState } from "react";
import { getStockProductById, getSupplier } from "../../../../mockingbin/api/mock-api.ts";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store.ts";
import { SupplierDto } from "../../../../apis/dto/supplier.dto.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import Button from "../../../../components/Button";
import { formatMoney } from "../../../../utils/Formater.ts";
import { ProductSimpleDto } from "../../../../apis/dto/product.simple.dto.ts";
import { CreateImportParams, CreateImportStackName } from "../../../../constants/ParamList.ts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ReturnItemModal from "../../components/ReturnItemModal";
import PlusIcon from "../../../../components/icons/PlusIcon";
import MinusIcon from "../../../../components/icons/MinusIcon";
import AddImportItemModal from "../../components/AddImportItemModal";
import addImportItemModal from "../../components/AddImportItemModal";

export interface IImportItem {
  product: ProductSimpleDto
  quantity: number
  isReturn: boolean
}

type NavigationProps = NativeStackScreenProps<CreateImportParams, CreateImportStackName.ADD_IMPORT_ITEM>

const AddImportItem = ({navigation}: NavigationProps) => {

  const {name, phone} = useSelector((state: IRootState) => state.supplier)


  const [supplier, setSupplier] = useState<SupplierDto | undefined>();
  const [items, setItems] = useState<IImportItem[]>([]);
  const [moneyPay, setMoneyPay] = useState(0)
  const [moneyReturn, setMoneyReturn] = useState(0)

  const [returnModalVisible, setReturnModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  //open modal
  const openModal = (type: "import" | "return") => {
    type === "return" ? setReturnModalVisible(true) : setAddModalVisible(true)
  }

  //close modal
  const closeModal = () => {
    setReturnModalVisible(false)
    setAddModalVisible(false)
  }

  //on cancel import
  const cancelImport = () => {
    navigation.pop(1)
  }

  //click confirm add
  const onAddItem = (type: "return" | "import", itemId: number, qty: number) => {
    closeModal()
    const item = getStockProductById(itemId);
    if(item){
      const find = items.find((elem) => elem.product.productId === itemId);
      if(find){
        setItems(items.map(elem => {
          if(elem.product.productId === find.product.productId){
            return {
              ...elem,
              quantity: parseInt(String(elem.quantity)) + parseInt(String(qty))
            }
          }else{
            return elem
          }
        }))
      }else{
        setItems([
          ...items,
          {
            product: item,
            quantity: qty,
            isReturn: type === "return"
          }
        ])

      }
    }
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
          returnMoney += item.quantity * item.product.price
        }else{
          payMoney += item.quantity * item.product.price
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
        <ReturnItemModal
          visible={returnModalVisible}
          onCancel={closeModal}
          onConfirm={(id: number, qty: number) => onAddItem("return", id, qty)}
        />
        <AddImportItemModal
          visible={addModalVisible}
          onCancel={closeModal}
          onConfirm={() => {}}
        />
        <View style={style.supplier}>
          <Text style={style.text}>Nhà cung cấp: {supplier ? supplier.name : "N/A"}</Text>
          <Text style={style.text}>Số điện thoại: {supplier ? supplier.phoneNumber : "N/A"}</Text>
          {(supplier && supplier.email) &&  <Text style={style.text}>Email: {supplier.email}</Text>}
          {(supplier && supplier.address) &&  <Text style={style.text}>Địa chỉ: {supplier.address}</Text>}
        </View>
        <View style={style.options}>
          <Button onClick={() => openModal("return")} label={"Trả hàng"} size={"medium"} color={"pink"} />
          <Button onClick={() => openModal("import")} label={"Nhập hàng"} size={"medium"} />
        </View>
        <View style={style.listContainer}>
          <ScrollView>
            {items.length > 0 && items.map((item: IImportItem, index) => (
              <View style={style.itemContainer} key={index}>
                <View style={style.itemInfo}>
                  <Text style={style.itemName}>{item.product.productName}</Text>
                  <View style={style.itemSubInfo}>
                    <Text style={style.itemSubInfoText}>Đơn giá: {formatMoney(item.product.price)}</Text>
                    <Text style={style.itemSubInfoText}>Số lượng: {item.quantity}</Text>
                  </View>
                </View>
                <Button
                  customStyle={{width: horizontalPixel(30), height: horizontalPixel(30)}}
                  size={"square"}
                  color={item.isReturn ? "pink" : "green"}
                  label={item.isReturn ? <MinusIcon/> : <PlusIcon/>}
                />
              </View>
            ))}

          </ScrollView>
        </View>
        <View style={style.summary}>
          <View style={style.info}>
            <Text style={style.infoText}>Tiền hoàn về: {formatMoney(moneyReturn)}</Text>
            <Text style={[style.infoText, {borderBottomWidth: 0.5, borderBottomColor: COLORS.PINK}]}>Tiền mua hàng: {formatMoney(moneyPay)}</Text>
            <Text style={style.infoText}>Tiền trả: {formatMoney(moneyPay - moneyReturn)}</Text>
          </View>
          <View style={style.action}>
            <Button onClick={cancelImport} label={"Hủy"} size={"medium"} color={"pink"}/>
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
    borderWidth: 0.5,
    borderColor: COLORS.PINK,
    borderRadius: 8,
    paddingHorizontal: horizontalPixel(5)
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
  itemContainer: {
    borderWidth: 0.5,
    borderColor: COLORS.PINK,
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: horizontalPixel(5),
    gap: horizontalPixel(5),
    alignItems: 'center',
    marginBottom: verticalPixel(5)
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
    borderRightWidth: 0.5,
    borderColor: COLORS.PINK,
    paddingRight: horizontalPixel(5),

  },
  itemName: {
    color: COLORS.BLACK,
    fontSize: fontPixel(20)

  },
  itemSubInfoText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(16)
  },
  itemSubInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
