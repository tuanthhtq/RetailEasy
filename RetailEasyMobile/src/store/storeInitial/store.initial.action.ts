import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICommonResponse } from "../../apis/CommonResponse.ts";
import { anyUserExistsService } from "../../apis/public/public.services.ts";


export const storeInitialState = createAsyncThunk<ICommonResponse<boolean>> (
  'auth/admin-exists',
  async () => {
    return await anyUserExistsService()
  }
)
