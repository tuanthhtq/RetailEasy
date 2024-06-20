import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, IAuthState } from "./authentication/auth.slice.ts";
import { useDispatch} from "react-redux";
import { IStoreInfoState, publicReducer } from "./public/public.slice.ts";

export interface IRootState {
  auth: IAuthState,
  public: IStoreInfoState
}

const rootReducer = combineReducers({
  auth: authReducer,
  public: publicReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
