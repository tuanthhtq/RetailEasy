import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.action.ts";
import { mmkv } from "../../utils/MMKVProvider.ts";
import { auth_key } from "../../constants/Keys.ts";

export interface  IAuthState {
  isAuthenticated: boolean
  accessToken: string | null
  phoneNumber: string | null
  fullName: string | null
  isLoading: boolean
  message: string | null
  roles: string[]
}


const initialState: IAuthState = {
  accessToken: mmkv.getString(auth_key.token) || null,
  fullName: mmkv.getString(auth_key.name) || null,
  isAuthenticated: mmkv.getBoolean(auth_key.authed) || false,
  phoneNumber: mmkv.getString(auth_key.phone) || null,
  isLoading: false,
  message: null,
  roles: mmkv.getString(auth_key.roles)?.split('\,') ||[]
}

const authSlice = createSlice({
  name: 'auth/login',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      console.log("Logout");

      state.accessToken = null
      state.isAuthenticated = false
    },
    checkLogin: (state) => {
      console.log("Check authentication");
      return state;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        console.log("Login pending");
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload && action.payload.data){
          console.log("Login success");
          const data = action.payload.data

          state.accessToken = data.token
          state.fullName = data.fullName
          state.isAuthenticated = true
          state.message = action.payload.message
          state.phoneNumber = data.phone
          state.roles = data.roles

          mmkv.set(auth_key.token, data.token)
          mmkv.set(auth_key.name, data.fullName)
          mmkv.set(auth_key.authed, true)
          mmkv.set(auth_key.phone, data.phone)
          mmkv.set(auth_key.roles, data.roles.toString())
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Login failed");
        if(action.error && action.error.message){
          state.message = action.error.message
        }
      })
  }
})

export const {logout, checkLogin} = authSlice.actions
export const authReducer = authSlice.reducer;
