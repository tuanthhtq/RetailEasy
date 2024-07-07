import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../components/ScreenHeader";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../store/store.ts";
import { fontPixel, horizontalPixel, verticalPixel } from "../../utils/Normalizer.ts";
import { COLORS } from "../../constants/Colors.ts";
import React, { useState } from "react";
import Button from "../../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SetupStoreParams, SetupStoreStackName } from "../../constants/ParamList.ts";
import { setupStoreServices } from "../../apis/public/public.services.ts";
import { StoreSetupDto } from "../../apis/public/dtos/store.setup.dto.ts";
import ResultModal from "./components/ResultModal";
import { login } from "../../store/authentication/auth.action.ts";
import { setInitialized, setInitialState } from "../../store/storeInitial/store.initial.slice.ts";

interface IItem {
  heading: string
  content?: string
}
type NavigationProp = NativeStackScreenProps<SetupStoreParams, SetupStoreStackName.RESULT>

const Item: React.FC<IItem> = ({heading, content = ""}) => {

  return (
    <View style={style.itemContainer}>
      <View style={style.itemHeading}>
        <Text style={style.itemText}>{heading}:</Text>
      </View>
      <View style={style.itemContent}>
        <Text style={style.itemText}>{content}</Text>
      </View>
    </View>
  )
}

const SetupStoreConfirmation = ({navigation} : NavigationProp) => {
  const {address, email, id, owner, phone, storeName}
    = useSelector((state: IRootState) => state.initialState);

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const onConfirm = () => {
    if (address && id && owner && phone && storeName) {
      const data: StoreSetupDto = {
        address,
        email,
        fullName: owner,
        idNumber: id,
        phone,
        storeName
      }
      dispatch(setInitialized())
      dispatch(login({phone: phone, password: phone}))
    }
  }


  const submit = () => {
    if(address && id && owner && phone && storeName){
      const data: StoreSetupDto = {
        address,
        email,
        fullName: owner,
        idNumber: id,
        phone,
        storeName
      }

      setupStoreServices(data)
        .then((res) => {
          if(res.data){
            setModalVisible(true);
          }
        })
        .catch((err) => {
          console.log({err});
        })

    }
  }

  return (
    <View style={style.container}>
      <ScreenHeader label={"Xác nhận thông tin"}/>
      <ResultModal visible={modalVisible} onConfirm={onConfirm}/>
      <ScrollView
        style={{
          height: '100%'
        }}
      >
        <View style={style.main}>
          <Text style={style.heading}>Hãy xác nhận những thông tin dưới đây là chính xác</Text>
          <View style={style.content}>
            <View style={style.information}>
              <Item heading={"Chủ cửa hàng"} content={owner}/>
              <Item heading={"Tên cửa hàng"} content={storeName}/>
              <Item heading={"Số căn cước"} content={id}/>
              <Item heading={"Điện thoại"} content={phone}/>
              <Item heading={"Email"} content={email}/>
              <Item heading={"Địa chỉ"} content={address}/>
            </View>
            <View style={style.action}>
              <Button color={"pink"} onClick={() => navigation.pop(1)} label={"Thay đổi thông tin"}/>
              <Button onClick={submit} label={"Xác nhận"}/>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: verticalPixel(40),
    paddingVertical: verticalPixel(20),

  },
  heading: {
    color: COLORS.BLACK,
    fontSize: fontPixel(28),
    textAlign: 'left'
  },
  content: {
    width: horizontalPixel(320),
    height: verticalPixel(620),
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  information: {
    gap: verticalPixel(20),
  },
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: COLORS.PINK,
    alignItems: 'flex-start'
  },
  itemHeading: {
    width: horizontalPixel(130)
  },
  itemContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end'
  },
  itemText: {
    color: COLORS.BLACK,
    fontSize: fontPixel(20),
    flexWrap: 'wrap',
  },
  action: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: verticalPixel(10)

  }
});

export default SetupStoreConfirmation
