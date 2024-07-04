import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { ImportItemDto } from "../../../../apis/dto/import.item.dto.ts";
import ComplexInputField from "../../../../components/ComplexInputField";
import Button from "../../../../components/Button";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import { useForm } from "react-hook-form";
import { ProductSimpleDto } from "../../../../apis/dto/product.simple.dto.ts";
import { getStockProductByName } from "../../../../mockingbin/api/mock-api.ts";


interface IAddGoodsModal{
  visible?: boolean,
  type: "import" | "return",
  onCancel: ()=>void,
  onConfirm: (data: ProductSimpleDto) => void
}

interface formData{
  id: number,
  name: string,
  quantity: number
}

const AddGoodsModal:React.FC<IAddGoodsModal> =({visible= false, ...props}) => {

  const [importItem, setImportItem] = useState<ImportItemDto[]>([]);
  const [stockItem, setStockItem] = useState<ProductSimpleDto[]>([]);
  const [selected, setSelected] = useState<ProductSimpleDto>()

  const  {control, handleSubmit, formState: {errors}, watch} = useForm<formData>()

  const nameValue = watch("name")

  //on selected
  const onSelect = (data: ProductSimpleDto) => {
    props.onConfirm(data)
  }
  //get data
  useEffect(() => {
    if(props.type === "import"){

    }else{  //select return goods
      setStockItem(getStockProductByName(nameValue))
    }
  }, [props.type]);

  return (
    <Modal
      animationType='fade'
      visible = {visible}
      transparent={true}
    >
      <View style={style.modalBackground}>
        <View style={style.modalContent}>
          <Text style={style.heading}>{props.type === "import" ? "Nhập hàng" : "Trả hàng"}</Text>
          <View style={style.main}>
            <ComplexInputField
              label={"Tên sản phẩm"}
              name={"name"}
              control={control}
              maxLength={100}
              errors={errors.name ? errors.name.message : "" }
            />
          </View>
          <View style={style.list}>
            {(props.type === "import" && importItem.length > 0) &&  (<View></View>)
            }
            {(props.type === "return" && stockItem.length > 0) &&
              stockItem.map((item: ProductSimpleDto, index) => (
                <View style={style.listItem} key={index}>
                  <Text style={{fontSize: 20, color: COLORS.BLACK, textAlign: 'center'}}
                  >{item.productName}</Text>
                </View>
              ))
            }
          </View>
          <View style={style.action}>
            <View style={style.summary}>
              <ComplexInputField
                label={"Số lượng"}
                name={"quantity"}
                control={control}
                maxLength={15}
                validatePhone
                errors={errors.quantity ? errors.quantity.message : "" }
              />
              <Text style={style.totalMoney}>0</Text>
            </View>
            <Button size={"small"} color={"pink"} onClick={props.onCancel} label={"Huỷ"}/>
            <Button size={"small"} onClick={() => onSelect} label={"Đồng ý"}/>
          </View>
        </View>
      </View>

    </Modal>
  )
}

const style = StyleSheet.create({
  modalBackground: {
    width: horizontalPixel(360),
    height: '100%',
    backgroundColor: COLORS.MODAL,
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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
    gap: verticalPixel(10),
    paddingVertical: verticalPixel(10)

  },
  heading: {
    fontSize: fontPixel(24),
    color: COLORS.BLACK
  },
  main: {
    flexGrow: 0.7,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  list: {
    flexDirection: 'column',
    gap: verticalPixel(2),
    alignItems: 'center'
  },
  listItem: {
    borderWidth: 0.5,
    width: horizontalPixel(310)
  },
  action: {
    width: horizontalPixel(320),
    flexDirection: "row",
    justifyContent: "space-evenly",
  }
})


export default AddGoodsModal
