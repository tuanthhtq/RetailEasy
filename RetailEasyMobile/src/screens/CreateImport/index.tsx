import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  CreateBillStackName,
  CreateImportParams,
  CreateImportStackName
} from "../../constants/ParamList.ts";
import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import Button from "../../components/Button";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import { useEffect, useState } from "react";
import GetSupplierModal from "./components/GetSupplierModal";
import { COLORS } from "../../constants/Colors.ts";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch } from "../../store/store.ts";
import { clearSupplier } from "../../store/import/import.slice.ts";


type NavigationProp = NativeStackScreenProps<CreateImportParams, CreateImportStackName.CREATE_IMPORT_HOME>

const CreateImport = ({navigation}: NavigationProp) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [recentImport, setRecentImport] = useState()

  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  //open "select supplier" modal
  const onCreate = () => {
    dispatch(clearSupplier())
    setModalVisible(true)
  }

  //continue to add items
  const onGoNext = () => {
    setModalVisible(false)
    navigation.navigate(CreateImportStackName.ADD_IMPORT_ITEM)
  }

  //cancel import
  const onCancel = () => {
    setModalVisible(false)
  }


  return (
    <View style={style.container}>
      <ScreenHeader label={"Nhập hàng"} backBtn={false}/>
      <GetSupplierModal onCancel={onCancel} visible={modalVisible} onNext={onGoNext}/>
      <View style={style.content}>
        <View style={style.listContainer}>
          <Text style={style.heading}>Đơn nhập hàng gần đây</Text>
          {recentImport ?
            <View style={style.list}></View> :
            <Text style={style.list}>Chưa có đơn nhập hàng nào</Text>
          }
          <View style={style.list}></View>
        </View>
        <Button onClick={onCreate} label={"Tạo đơn nhập hàng"}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    width: horizontalPixel(340),
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: verticalPixel(14),
    gap: verticalPixel(10),
  },
  listContainer: {
    flexGrow: 1,
    width: horizontalPixel(340),
  },
  heading: {
    color: COLORS.BLACK,
    fontSize: fontPixel(20)
  },
  list: {

  }

})

export default CreateImport
