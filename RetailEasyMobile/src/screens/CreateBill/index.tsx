import { StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { useEffect, useState } from "react";
import { getRecentBills } from "../../apis/employee/employee.services.ts";
import { useAppDispatch } from "../../store/store.ts";
import { useIsFocused } from "@react-navigation/native";
import { logout } from "../../store/authentication/auth.slice.ts";
import { BillsDto } from "../../apis/dto/bills.dto.ts";
import { COLORS } from "../../constants/Colors.ts";
import { horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import Divider from "../../components/icons/Divider";
import Button from "../../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  CreateBillParams,
  CreateBillStackName,
} from "../../constants/ParamList.ts";
import GetInfoModal from "./components/GetInfoModal";

type NavigationProp = NativeStackScreenProps<CreateBillParams, CreateBillStackName.CREATE_BILL_HOME>

const CreateBill = ({navigation}: NavigationProp) => {

  const [recentBill, setRecentBill] = useState<BillsDto[]>([])
  const [modalVisible, setModalVisible] = useState(false)

  const appDispatch = useAppDispatch();
  const isFocused = useIsFocused();

  //open modal
  const openModal = () => {
    setModalVisible(true)
  }
  //close modal
  const onCloseModal = () => {
    setModalVisible(false);
  }

  //on continue
  const onContinue = () => {
    onCloseModal()
    navigation.navigate(CreateBillStackName.ADD_BILL_ITEM)
  }




  //get recent bill
  useEffect(() => {
    if(isFocused){
      getRecentBills()
        .then((res)=> {
          if(res && res.data){
            setRecentBill(res.data)
          }
        })
        .catch((err)=> {
          console.log("Session invalid");
          appDispatch(logout())
        })
    }
  }, [isFocused])


  return (
    <View style={style.container}>
      <ScreenHeader label={"Tạo đơn hàng"} backBtn={false}/>
      <GetInfoModal isVisible={modalVisible} onContinue={onContinue} onClose={onCloseModal}/>
      <View style={style.content}>
        <View style={style.main}>
          <Text style={{fontSize: 24, color: COLORS.BLACK}}>Đơn hàng gần đây</Text>
          <Divider/>
          {recentBill.length > 0 ?
            recentBill.map(item => <View></View>)
            :
            <View>
              <Text
                style={{fontSize: 20, color: COLORS.BLACK, textAlign: 'center'}}
              >Không có đơn hàng nào</Text>
            </View>
          }
          <View style={style.list}></View>
        </View>
        <View style={style.action}>
          <Button color={"green"} onClick={openModal} label={"Tạo đơn"}/>
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
  },
  content: {
    width: horizontalPixel(340),
    height: verticalPixel(624),
    marginTop: verticalPixel(15),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 0.8,
  },
  main: {
    width: horizontalPixel(320),
    height: verticalPixel(524),
    flexGrow: 1,
    gap: 10
  },
  list: {
  },
  action: {

  }

})

export default CreateBill;
