import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontPixel, horizontalPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import { COLORS } from "../../../../constants/Colors.ts";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import { SupplierDto } from "../../../../apis/dto/supplier.dto.ts";
import ComplexInputField from "../../../../components/ComplexInputField";
import { get4LastSupplier, getSupplierByName } from "../../../../mockingbin/api/mock-api.ts";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../../../store/store.ts";
import { clearSupplier, setImportSupplier } from "../../../../store/import/import.slice.ts";
import Modal from "react-native-modal"

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
  const onCancelImport = () => {
    props.onCancel();
    setAddSupplierShown(false)
  }

  //on next
  const onNextStep = () => {
    if(supplierName && supplierPhone && nameValue === supplierName){
      props.onNext();
      dispatch(setImportSupplier({name: supplierName, phone: supplierPhone}))
    }else{
      dispatch(clearSupplier())
      setSupplierError("Thông tin không hợp lệ")
    }
  }

  //select existing supplier
  const onSelectSupplier = (supplier: SupplierDto) => {
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
    return () => clearTimeout(timeout)
  }, [supplierError]);



  return (
    <Modal
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      isVisible={props.visible}
      style={style.container}
    >
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
                <View style={style.itemContainer} key={index} onTouchStart={() => onSelectSupplier(item) }>
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
            onClick={onCancelImport}
            size={"medium"}
            color={"pink"}
          />
          <Button
            label={"Tiếp tục"}
            onClick={onNextStep}
            size={"medium"}
          />

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
    width: horizontalPixel(300),
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
