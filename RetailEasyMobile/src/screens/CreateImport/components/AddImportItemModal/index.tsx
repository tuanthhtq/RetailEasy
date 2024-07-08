import React, { ReactNode, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ComplexInputField from "../../../../components/ComplexInputField";
import Button from "../../../../components/Button";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import { useForm } from "react-hook-form";
import { ProductSimpleDto } from "../../../../apis/dto/product.simple.dto.ts";
import { getAmountStockProduct, getStockProductById, getStockProductByName } from "../../../../mockingbin/api/mock-api.ts";
import Modal from "react-native-modal"
import { formatMoney } from "../../../../utils/Formater.ts";
import { BrandDto } from "../../../../apis/dto/brand.dto.ts";
import { CategoryDto } from "../../../../apis/dto/category.dto.ts";
import { Brands, Categories, StockItems } from "../../../../mockingbin/MockData.ts";
import StringDropdown from "../../../../components/StringDropdown";

interface IAddImportItemModal {
  visible?: boolean,
  onCancel: ()=>void,
  onConfirm: (data: ProductSimpleDto) => void
}

interface formData{
  id: number,
  name: string,
  quantity: number,
  brand: string,
  category: string
}


const AddImportItemModal:React.FC<IAddImportItemModal> =({visible= false, ...props}) => {

  const [stockItem, setStockItem] = useState<ProductSimpleDto[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProductSimpleDto>();
  const [selectedId, setSelectedId] = useState(-1)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("Chọn 1")
  const [focusedField, setFocusedField] = useState("")

  const  {control, formState: {errors}, watch} = useForm<formData>()

  const nameValue = watch("name")
  const quantityValue = watch("quantity")

  //on selected
  const onConfirmAdd = () => {
    const item = getStockProductById(selectedId)
    if(item && selectedId > 0){
      setSelectedItem(item)
      if(quantityValue > 0 && quantityValue <= item.stock ){
        props.onConfirm(item)
      }else{
        setError(`Số lượng phải lớn hơn 0 và bé hơn hoặc bằng ${item.stock}`)
      }
    }else{
      setError("Vui lòng chọn sản phẩm hoặc bấm \"Hủy\"")
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

  //render popup items list
  const renderBrands = () => {
    return Brands.map((item: BrandDto, index) => (
      <Text style={style.popupItem} key={index}>{item.brandName}</Text>
    ))
  }

  const renderProducts = () => {
      return  StockItems.map((item: ProductSimpleDto, index) => (
      <Text style={style.popupItem} key={index}>{item.productName}, Kho: {item.stock}</Text>
    ))
  }

  //get stock items by name
  useEffect(() => {
    setStockItem(getStockProductByName(nameValue))
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
        <Text style={style.heading}>{"Nhập hàng"}</Text>
        <View style={style.info}>
          <View style={style.inputGroup}>
            <ComplexInputField
              label={"Tên sản phẩm"}
              name={"name"}
              control={control}
              maxLength={100}
              errors={errors.name ? errors.name.message : "" }
              onFieldFocus={(fieldName: string) => onFocus(fieldName)}
            />
            <View style={[style.popup, {display: focusedField === "name" ? "flex" : "none"}]}>{renderProducts()}</View>
          </View>
          <View style={style.inputGroup}>
            <ComplexInputField
              label={"Hãng sản xuất"}
              name={"brand"}
              control={control}
              maxLength={100}
              errors={errors.brand ? errors.brand.message : "" }
              onFieldFocus={(fieldName: string) => onFocus(fieldName)}
            />
            <View style={[style.popup, {display: focusedField === "brand" ? "flex" : "none"}]}>{renderBrands()}</View>
          </View>
            <StringDropdown
              label={"Phân loại"}
              defaultValue={category}
              onSelect={(value: string) => {
                setCategory(value)
              }}
              data={Categories}
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
  inputGroup: {
    position: 'relative'
  },
  popup: {
    width: '50%',
    height: 100,
    position: 'absolute',
    borderWidth: 0.5,
    top: verticalPixel(80),
    right: 0,
    zIndex: 1,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.PINK,
    borderTopWidth: 0,
    borderBottomWidth: 0

  },
  popupItem: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    borderWidth: 0.5,
    borderColor: COLORS.PINK,
    borderRadius: 4
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
