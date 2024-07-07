import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequestDto } from "../../apis/auth/dtos/login.request.ts";
import { AuthResponseDto } from "../../apis/auth/dtos/auth.response.ts";
import { loginService } from "../../apis/auth/auth.services.ts";


export const login = createAsyncThunk<AuthResponseDto, LoginRequestDto>(
  'auth/login',
  async (credentials, thunkAPI) => {
      return await loginService(credentials);
  }
)

