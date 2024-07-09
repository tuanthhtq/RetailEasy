import React, { ReactNode, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ComplexInputField from "../../../../components/ComplexInputField";
import Button from "../../../../components/Button";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import { useForm } from "react-hook-form";
import { ProductSimpleDto } from "../../../../apis/dto/product.simple.dto.ts";
import {  getStockProductById, getStockProductByName } from "../../../../mockingbin/api/mock-api.ts";
import Modal from "react-native-modal"
import { formatMoney } from "../../../../utils/Formater.ts";
import { Brands, Categories, StockItems } from "../../../../mockingbin/MockData.ts";
import StringDropdown from "../../../../components/StringDropdown";

interface IAddImportItemModal {
  visible?: boolean,
  onCancel: ()=>void,
  onConfirm: (name: string, brand: string, category: string, qty: number) => void
}

interface formData{
  id: number,
  name: string,
  quantity: number,
  brand: string,
  category: string
}


const AddImportItemModal:React.FC<IAddImportItemModal> =({visible= false, ...props}) => {

  const [selectedItem, setSelectedItem] = useState<ProductSimpleDto>();
  const [selectedId, setSelectedId] = useState(-1)
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState("")

  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [name, setName] = useState("")

  const  {control, formState: {errors}, watch} = useForm<formData>()

  const quantityValue = watch("quantity")

  //on selected
  const onConfirmAdd = () => {
    if(category && name && brand && quantityValue){
      props.onConfirm(name.split("|")[0].trim(), brand, category, quantityValue)
    }else{
      setError("Thông tin không hợp lệ")
    }
  }

  //on focus field
  const onFocus = (fieldName: string) => {
    if(fieldName === focusedField || fieldName === "quantity"){
      setFocusedField("")
    }else{
      setFocusedField(fieldName)
    }
  }

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
        <Text style={style.heading}>{"Nhập hàng"}</Text>
        <View
          style={style.info}
          onTouchEnd={() => onFocus("")}>
          <StringDropdown
            label={"Tên sản phẩm"}
            onSelect={(value: string) => {
              setName(value)
            }}
            data={StockItems.map((item) => ({
              id: item.productId,
              name: item.productName + " | Kho: " + item.stock
            }))}
          />
          <StringDropdown
            label={"Hãng sản xuất"}
            onSelect={(value: string) => {
              setBrand(value)
            }}
            data={Brands.map((item) => ({
              id: item.brandId,
              name: item.brandName
            }))}
          />
          <StringDropdown
            label={"Phân loại"}
            onSelect={(value: string) => {
              setCategory(value)
            }}
            data={Categories.map((item) => ({
              id: item.categoryId,
              name: item.categoryName
            }))}
          />
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
                onFieldFocus={(fieldName: string) => onFocus(fieldName)}
              />
              <Text style={style.totalMoney}>Thành tiền: {formatMoney((selectedItem ? selectedItem.price : 0) * quantityValue)} VND</Text>
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
export default AddImportItemModal
