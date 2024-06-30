import { mmkv } from "../../utils/MMKVProvider.ts";
import { store_initial_state_key } from "../../constants/Keys.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storeInitialState } from "./store.initial.action.ts";
import { StoreSetupDto } from "../../apis/public/dtos/StoreSetupDto.ts";


export interface IStoreInitialState {
  owner: string | undefined,
  id: string | undefined,
  storeName: string | undefined
  phone: string | undefined
  email: string | undefined
  address: string | undefined
  initialized: boolean,
}

const initialState: IStoreInitialState = {
  address: undefined,
  email: undefined,
  id: undefined,
  owner: undefined,
  phone: undefined,
  storeName: undefined,
  initialized: mmkv.getBoolean(store_initial_state_key.initial_state) || false
}

const storeInitialSlice = createSlice({
  name: "auth/admin-exists",
  initialState: initialState,
  reducers: {
    getInitialState: (state) => {
      console.log("Get store initial state");
      return state;
    },
    setInitialState: (state, action: PayloadAction<StoreSetupDto>) => {
      if(action.payload){
        console.log("Set store initial state");
        state.owner = action.payload.fullName.trim()
        state.id = action.payload.idNumber.trim()
        state.storeName = action.payload.storeName.trim()
        state.email = action.payload.email?.trim()
        state.phone = action.payload.phone.trim()
        state.address = action.payload.address.trim()
      }
    },
    setInitialized: (state) => {
      state.owner = undefined
      state.id = undefined
      state.storeName = undefined
      state.email = undefined
      state.phone = undefined
      state.address = undefined
      state.initialized = true

      mmkv.set(store_initial_state_key.initial_state, true)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(storeInitialState.pending, (state) => {
        console.log("Getting store initialization state");
      })
      .addCase(storeInitialState.rejected, (state) => {
        console.log("Failed to get store initialization state");
      })
      .addCase(storeInitialState.fulfilled, (state, action) => {
        console.log("Get store initialization state succeeded");
        if(action.payload.data){
          state.initialized = true;
          mmkv.set(store_initial_state_key.initial_state, action.payload.data)
        }
      })
  }
})

export const { getInitialState, setInitialState, setInitialized } = storeInitialSlice.actions;
export const storeInitialReducer = storeInitialSlice.reducer
