import { StoreInfoDto } from "../../apis/public/dtos/store.info.dto.ts";
import { mmkv } from "../../utils/MMKVProvider.ts";
import { store_info_key } from "../../constants/Keys.ts";
import { createSlice } from "@reduxjs/toolkit";
import { landing } from "./public.action.ts";

export interface IStoreInfoState extends StoreInfoDto{
  isLoading: boolean,
  error: string | null
}

const initialState: IStoreInfoState = {
  address: mmkv.getString(store_info_key.address) || "",
  email: mmkv.getString(store_info_key.email) || "",
  name: mmkv.getString(store_info_key.name) || "",
  owner: mmkv.getString(store_info_key.owner) || "",
  phoneNumber: mmkv.getString(store_info_key.phone) || "",
  phoneNumber2: mmkv.getString(store_info_key.phone2) || "",
  isLoading: false,
  error: null
}


const publicSlice = createSlice({
  name: "public/landing",
  initialState: initialState,
  reducers: {
    checkStoreInfo: (state) => {
      console.log("Check store information");
      return state
    }
  },
  extraReducers: builder => {
    builder
      .addCase(landing.pending, (state) => {
        console.log("Landing pending");
        state.isLoading = true;
      })
      .addCase(landing.fulfilled, (state, action) => {
        console.log("Landing success");
        if(action.payload && action.payload.data){
          const data = action.payload.data;
          state.isLoading = false;
          state.name = data.name
          state.owner = data.owner
          state.phoneNumber = data.phoneNumber
          state.phoneNumber2 = data.phoneNumber2
          state.email = data.email
          state.address = data.address

          mmkv.set(store_info_key.name, data.name)
          mmkv.set(store_info_key.owner, data.owner)
          if(data.phoneNumber2) mmkv.set(store_info_key.phone2, data.phoneNumber2)
          mmkv.set(store_info_key.phone, data.phoneNumber)
          if(data.email) mmkv.set(store_info_key.email, data.email)
          mmkv.set(store_info_key.address, data.address)
        }
      })
      .addCase(landing.rejected, (state, action) => {
        console.log("Landing failed", action);
      })

  }
})

export const {checkStoreInfo} = publicSlice.actions
export const publicReducer = publicSlice.reducer;
