import { ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../../../../components/ScreenHeader";
import ComplexInputField from "../../../../components/ComplexInputField";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { COLORS } from "../../../../constants/Colors.ts";
import { fontPixel, verticalPixel } from "../../../../utils/Normalizer.ts";
import { IRootState, useAppDispatch } from "../../../../store/store.ts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  SetupStoreParams,
  SetupStoreStackName
} from "../../../../constants/ParamList.ts";
import { useSelector } from "react-redux";
import { StoreSetupDto } from "../../../../apis/public/dtos/StoreSetupDto.ts";
import { setInitialState } from "../../../../store/storeInitial/store.initial.slice.ts";

interface formData {
  name: string,
  id: string,
  storeName: string,
  phone: string,
  address: string,
  email?: string
}

type NavigationProp = NativeStackScreenProps<SetupStoreParams, SetupStoreStackName.GET_DATA>

const SetupStoreGetData = ({navigation}: NavigationProp) =>{

  const {address, email, id, owner, phone, storeName}
    = useSelector((state: IRootState) => state.initialState);


  const  {control, handleSubmit, formState: {errors}, setError} = useForm<formData>()
  const [setupError, setSetupError] = useState("");

  const dispatch = useAppDispatch();

  const onSubmit = (data: formData) => {
    const payload: StoreSetupDto = {
      address: data.address,
      email: data.email,
      idNumber: data.id,
      fullName: data.name,
      phone: data.phone,
      storeName: data.storeName
    }
    dispatch(setInitialState(payload));
    navigation.navigate(SetupStoreStackName.RESULT)
  }

  return (
    <View style={style.container} >
      <ScreenHeader label={"Cài đặt lần đầu"}/>
      <ScrollView
        style={{
          height: '100%',
        }}
      >
        <View style={style.main}>
          <Text style={style.heading}>Thêm thông tin cửa hàng</Text>
          <View style={style.form}>
            <ComplexInputField
              defaultValue={owner}
              label={"Họ tên"}
              name={"name"}
              control={control}
              maxLength={100}
              validateName
              errors={errors.name && errors.name.message}
            />
            <ComplexInputField
              label={"Số căn cước"}
              name={"id"}
              defaultValue={id}
              control={control}
              maxLength={20}
              errors={errors.id && errors.id.message}
            />
            <ComplexInputField
              label={"Số điện thoại"}
              name={"phone"}
              defaultValue={phone}
              validatePhone
              control={control}
              maxLength={15}
              errors={errors.phone && errors.phone.message}
            />
            <ComplexInputField
              label={"Tên cửa hàng"}
              defaultValue={storeName}
              name={"storeName"}
              control={control}
              maxLength={150}
              errors={errors.storeName && errors.storeName.message}
            />
            <ComplexInputField
              label={"Email"}
              name={"email"}
              validateEmail
              required={false}
              defaultValue={email}
              control={control}
              maxLength={150}
              errors={errors.email && errors.email.message}
            />
            <ComplexInputField
              label={"Địa chỉ"}
              name={"address"}
              control={control}
              defaultValue={address}
              maxLength={150}
              errors={errors.address && errors.address.message}
              isTextarea
            />
          </View>
          <View style={style.action}>
            <Text style={style.setupRes}>{setupError}</Text>
            <Button label={"Tiếp tục"} onClick={handleSubmit(onSubmit)}/>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: verticalPixel(10)
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  heading: {
    color: COLORS.BLACK,
    fontSize: fontPixel(28)
  },
  form: {

  },
  action: {

  },
  setupRes: {

  }
})

export default SetupStoreGetData;
