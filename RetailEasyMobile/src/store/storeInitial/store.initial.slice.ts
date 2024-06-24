import { mmkv } from "../../utils/MMKVProvider.ts";
import { store_initial_state_key } from "../../constants/Keys.ts";
import { createSlice } from "@reduxjs/toolkit";
import { storeInitial } from "./store.initial.action.ts";


export interface IStoreInitialState {
  initialized: boolean,

}

const initialState: IStoreInitialState = {
  initialized: mmkv.getBoolean(store_initial_state_key.initial_state) || false
}

const storeInitialSlice = createSlice({
  name: "auth/admin-exists",
  initialState: initialState,
  reducers: {
    getInitialState: (state) => {
      console.log("Get store initial state");
      return state;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(storeInitial.pending, (state) => {
        console.log("Getting store initialization state");
      })
      .addCase(storeInitial.rejected, (state) => {
        console.log("Failed to get store initialization state");
      })
      .addCase(storeInitial.fulfilled, (state, action) => {
        console.log("Get store initialization state succeeded");
        if(action.payload.data){
          state.initialized = true;
          mmkv.set(store_initial_state_key.initial_state, action.payload.data)
        }
      })
  }
})

export const { getInitialState } = storeInitialSlice.actions;
export const storeInitialReducer = storeInitialSlice.reducer
