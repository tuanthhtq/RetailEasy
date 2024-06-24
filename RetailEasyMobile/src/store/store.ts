import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, IAuthState } from "./authentication/auth.slice.ts";
import { useDispatch} from "react-redux";
import { IStoreInfoState, publicReducer } from "./public/public.slice.ts";
import { billCustomerReducer, IBillCustomer } from "./bill/bill.slice.ts";
import { IStoreInitialState, storeInitialReducer } from "./storeInitial/store.initial.slice.ts";

export interface IRootState {
  auth: IAuthState,
  public: IStoreInfoState,
  billCustomer: IBillCustomer,
  initialState: IStoreInitialState
}

const rootReducer = combineReducers({
  auth: authReducer,
  public: publicReducer,
  billCustomer: billCustomerReducer,
  initialState: storeInitialReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
