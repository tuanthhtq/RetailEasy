import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ImportItemDto } from "../../../../apis/dto/import.item.dto.ts";
import ComplexInputField from "../../../../components/ComplexInputField";
import Button from "../../../../components/Button";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import { useForm } from "react-hook-form";
import { ProductSimpleDto } from "../../../../apis/dto/product.simple.dto.ts";
import { getAmountStockProduct, getStockProductById, getStockProductByName } from "../../../../mockingbin/api/mock-api.ts";
import Modal from "react-native-modal"
import { formatMoney } from "../../../../utils/Formater.ts";

interface IReturnItemModal{
  visible?: boolean,
  onCancel: ()=>void,
  onConfirm: (itemId: number, qty: number) => void
}

 interface formData{
  id: number,
  name: string,
  quantity: number
}

const ReturnItemModal:React.FC<IReturnItemModal> =({visible= false, ...props}) => {

  const [stockItem, setStockItem] = useState<ProductSimpleDto[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProductSimpleDto>();
  const [selectedId, setSelectedId] = useState(-1)
  const [error, setError] = useState("")

  const  {control, formState: {errors}, watch} = useForm<formData>()

  const nameValue = watch("name")
  const quantityValue = watch("quantity")

  //on selected
  const onConfirmAdd = () => {
    const item = getStockProductById(selectedId)
    if(item && selectedId > 0){
      setSelectedItem(item)
      if(quantityValue > 0 && quantityValue <= item.stock ){
        props.onConfirm(selectedId, quantityValue)
      }else{
        setError(`Số lượng phải lớn hơn 0 và bé hơn hoặc bằng ${item.stock}`)
      }
    }else{
      setError("Vui lòng chọn sản phẩm hoặc bấm \"Hủy\"")
    }
  }

  //get stock items by name
  useEffect(() => {
    setStockItem(getStockProductByName(nameValue))
  }, [nameValue])

  //get 10 stock item
  useEffect(() => {
    setStockItem(getAmountStockProduct(10))
  }, [nameValue])

  //clear error
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("")
    }, 3000)
    return () => clearTimeout(timeout)
  }, [error])

  //selected item
  useEffect(() => {
    const item = getStockProductById(selectedId)
    if(item){
      setSelectedItem(item)
    }
  }, [selectedId]);


  return (
    <Modal
      isVisible = {visible}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      style={style.container}
      avoidKeyboard={false}
    >
      <View style={style.modalContent}>
        <Text style={style.heading}>{"Trả hàng"}</Text>
        <View style={style.info}>
          <ComplexInputField
            label={"Tìm sản phẩm"}
            name={"name"}
            control={control}
            maxLength={100}
            errors={errors.name ? errors.name.message : "" }
          />
        </View>
        <View style={style.list}>
          <ScrollView>
            {(stockItem.length > 0) &&
              stockItem.map((item: ProductSimpleDto, index) => (
                <View style={[style.listItem, item.productId === selectedId && {backgroundColor: COLORS.GREEN}]} key={index} onTouchStart={() => setSelectedId(item.productId)}>
                  <Text style={{fontSize: fontPixel(20), color: COLORS.BLACK}}>{item.productName}</Text>
                  <View style={style.itemSubInfo}>
                    <Text style={{fontSize: fontPixel(18) , color: COLORS.BLACK}}>Đơn giá: {formatMoney(item.price)}</Text>
                    <Text style={{fontSize: fontPixel(18) , color: COLORS.BLACK}}>Kho: {item.stock}</Text>

                  </View>
                </View>
              ))
            }

          </ScrollView>
        </View>
        <View style={style.actionContainer}>
          {error && <Text style={style.error}>{error}</Text>}
          <View style={style.action}>
            <View style={style.summary}>
              <ComplexInputField
                label={"Số lượng"}
                name={"quantity"}
                control={control}
                maxLength={15}
                validatePhone
                errors={errors.quantity ? errors.quantity.message : "" }
                keyboardType={"number-pad"}
              />

              <Text style={style.totalMoney}>Tổng: {formatMoney((selectedItem ? selectedItem.price : 0) * quantityValue)} VND</Text>
            </View>
            <View style={style.buttons}>
              <Button size={"small"} color={"pink"} onClick={props.onCancel} label={"Huỷ"}/>
              <Button size={"small"} onClick={onConfirmAdd} label={"Đồng ý"}/>

            </View>

          </View>
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MODAL
  },
  modalContent: {
    zIndex: 1,
    width: horizontalPixel(320),
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: COLORS.PINK,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: verticalPixel(5),
    paddingVertical: verticalPixel(10)

  },
  heading: {
    fontSize: fontPixel(24),
    color: COLORS.BLACK
  },
  info: {
    width: horizontalPixel(300),
  },
  error: {
    fontSize: fontPixel(18),
    color: COLORS.PINK,
    textAlign: 'center'
  },
  list: {
    alignItems: 'center',
    height: verticalPixel(300),
    width: horizontalPixel(320),
    paddingVertical: verticalPixel(5),
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: COLORS.PINK
  },
  listItem: {
    borderWidth: 0.5,
    borderColor: COLORS.PINK,
    borderRadius: 8,
    width: horizontalPixel(310),
    paddingHorizontal: horizontalPixel(5),
    marginBottom: verticalPixel(5)
  },
  itemSubInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionContainer: {
    width: horizontalPixel(310),
    flexDirection: "column",
    justifyContent: 'flex-end',
    rowGap: verticalPixel(10),
  },
  action: {
    width: horizontalPixel(310),
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: horizontalPixel(5)
  },
  summary: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  totalMoney: {
    fontSize: fontPixel(18),
    color: COLORS.BLACK
  },
  buttons: {
    flexDirection: 'column',
    gap: verticalPixel(10)
  }
})


export default ReturnItemModal
