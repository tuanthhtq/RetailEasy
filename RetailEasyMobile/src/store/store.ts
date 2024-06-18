import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authentication/auth.slice.ts";
import { IAuthState } from "./authentication/auth.type.ts";

export interface IRootState {
  auth: IAuthState
}

const rootReducer = combineReducers({
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer
})
