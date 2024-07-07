import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IImportState {
  name?: string,
  phone?: string,
  message?: string,
}


const initialSate: IImportState = {
  name: undefined,
  phone: undefined,
  message: undefined
}

const importSlice = createSlice({
  name: "emp/import",
  initialState: initialSate,
  reducers: {
    getImportData: (state) => {
      console.log("Get supplier data");
      return state;
    },
    setImportSupplier: (state, action: PayloadAction<IImportState>) => {
      console.log("Set supplier");
      state.name = action.payload.name
      state.phone = action.payload.phone
      state.message = action.payload.message
    },
    clearSupplier: (state) => {
      console.log("clear bill customer info");
      state.name = undefined
      state.phone = undefined
      state.message = undefined
    }
  }
})


export const {getImportData, setImportSupplier, clearSupplier} = importSlice.actions
export const  importReducer = importSlice.reducer
