import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginRequest } from "../../apis/auth/dtos/LoginRequest.ts";
import { IAuthResponse } from "../../apis/auth/dtos/AuthResponse.ts";
import { loginService } from "../../apis/auth/auth.services.ts";


export const login = createAsyncThunk<IAuthResponse, ILoginRequest>(
  'auth/login',
  async (credentials, thunkAPI) => {
      return await loginService(credentials);
  }
)

