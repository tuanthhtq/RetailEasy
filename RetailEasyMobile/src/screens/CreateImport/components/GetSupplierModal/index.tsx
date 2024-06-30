import React, { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import { SupplierDto } from "../../../../apis/dto/supplier.dto.ts";
import ComplexInputField from "../../../../components/ComplexInputField";
import { get4LastSupplier, getSupplierByName } from "../../../../mockingbin/api/mock-api.ts";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../../../store/store.ts";
import { setImportSupplier } from "../../../../store/import/import.slice.ts";

interface IGetSupplierModal{
  visible: boolean,
  onNext: () => void,
  onCancel: ()=> void
}

interface formData{
  name: string,
  phoneNumber: string
}

const GetSupplierModal: React.FC<IGetSupplierModal> = ({...props}) => {

  const {name, phone} = useSelector((state: IRootState) => state.supplier)

  const [data, setData] = useState<SupplierDto[]>([])
  const [addSupplierShown, setAddSupplierShown] = useState(false)
  const [supplierError, setSupplierError] = useState("")
  const [supplierName, setSupplierName] = useState(name)
  const [supplierPhone, setSupplierPhone] = useState(phone)

  const  {control, handleSubmit, formState: {errors}, setValue, watch} = useForm<formData>()
  const dispatch = useAppDispatch()

  //get name value
  const nameValue = watch("name")
  const phoneValue = watch("phoneNumber")

  //open add new supplier option
  const onClickAddSupplier = () => {
    setAddSupplierShown(true)
  }

  //cancel import
  const onCancel = () => {
    props.onCancel();
    setAddSupplierShown(false)
  }

  //on next
  const onNext = () => {
    console.log(supplierPhone, supplierName);
    if(supplierName && supplierPhone){
      props.onNext();
      dispatch(setImportSupplier({name: supplierName, phone: supplierPhone}))
    }else{
      setSupplierError("Thông tin không hợp lệ")
    }
  }

  //select existing supplier
  const onSelect = (supplier: SupplierDto) => {
    setSupplierName(supplier.name)
    setSupplierPhone(supplier.phoneNumber)
    setValue("name", supplier.name)
  }

  //render recent supplier
  useEffect(() => {
    if(!addSupplierShown){
      if(nameValue){
        const data = getSupplierByName(nameValue)
        setData(data)
      }else{
        setData(get4LastSupplier())
      }

    }
  }, [nameValue]);

  //clear error
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSupplierError("")
    }, 3000)

    return clearTimeout(timeout)
  });



  return (
    <Modal
      transparent
      visible={props.visible}
    >
      <View style={style.modalBackground}>
        <View style={style.modalContent}>
          <View style={style.info}>
            <View style={style.form}>
              <ComplexInputField
                label={"Tên nhà cung cấp"}
                name={'name'}
                control={control}
                maxLength={150}
                required={addSupplierShown}
                validateName={addSupplierShown}
                defaultValue={supplierName}
              />
              {addSupplierShown &&
                <ComplexInputField
                  label={"Số điện thoại "}
                  name={'phoneNumber'}
                  control={control}
                  maxLength={150}
                  required
                  validatePhone
                />
              }
            </View>
            {(data.length > 0 && !addSupplierShown) &&
              <View style={style.list} >
                {data.map((item: SupplierDto, index) => (
                  <View style={style.itemContainer} key={index} onTouchStart={() => onSelect(item) }>
                    <Text style={style.itemText}>{item.name}</Text>
                    <Text style={style.itemText}>{item.phoneNumber}</Text>
                  </View>
                ))}
              </View>
            }
            {(data.length == 0 && !addSupplierShown) &&
              <Button color={"pink"} label={"Thêm mới"} onClick={onClickAddSupplier} size={"small"}/>
            }
          </View>
          <Text>{supplierError}</Text>
          <View style={style.action}>
            <Button
              label={"Hủy"}
              onClick={onCancel}
              size={"medium"}
              color={"pink"}
            />
            <Button
              label={"Tiếp tục"}
              onClick={onNext}
              size={"medium"}
            />

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
    width: horizontalPixel(320),
    height: verticalPixel(450),
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: COLORS.PINK,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: verticalPixel(10),
    gap: verticalPixel(10)
  },
  info: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: verticalPixel(10)
  },
  form: {
  },
  list: {
    flexDirection: 'column',
    gap: verticalPixel(5),
  },
  itemContainer: {
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: horizontalPixel(5),
    width: horizontalPixel(300),
    borderColor: COLORS.PINK
  },
  itemText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18)

  },
  action: {
    flexDirection: 'row',
    width: horizontalPixel(320),
    justifyContent: 'space-evenly'
  }
})

export default GetSupplierModal;
