import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreInfoService } from "../../apis/public/public.services.ts";
import { StoreInfoDto } from "../../apis/public/dtos/StoreInfoDto.ts";
import { ICommonResponse } from "../../apis/CommonResponse.ts";

export const landing = createAsyncThunk<ICommonResponse<StoreInfoDto>>(
  'public/landing',
  async (thunkAPI) => {
    return await getStoreInfoService();
  }
)

