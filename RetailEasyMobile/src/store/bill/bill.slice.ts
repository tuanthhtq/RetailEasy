import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductSimpleDto } from "../../apis/dto/product.simple.dto.ts";

export interface IBillCustomer {
  id: number | null,
  name: string | null,
  phone: string | null,
  billItems: ProductSimpleDto[]
}


const initialSate: IBillCustomer = {
  id: null,
  name: null,
  phone: null,
  billItems: []
}

const billSlice = createSlice({
  name: "emp/bill",
  initialState: initialSate,
  reducers: {
    getBillCustomerInfo: (state) => {
      console.log("Get saved bill customer");
      return state;
    },
    setBillCustomerInfo: (state, action: PayloadAction<IBillCustomer>) => {
      console.log("Set bill customer");
      state.id = action.payload.id
      state.name = action.payload.name
      state.phone = action.payload.phone
    },
    clearBillCustomerInfo: (state) => {
      console.log("clear bill customer info");
      state.id = null
      state.name = null
      state.phone = null
      state.billItems = []
    }
  }
})


export const {getBillCustomerInfo, setBillCustomerInfo, clearBillCustomerInfo} = billSlice.actions
export const  billCustomerReducer = billSlice.reducer
