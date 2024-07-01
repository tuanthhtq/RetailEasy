import { createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../../apis/public/public.services.ts";
import { StoreInfoDto } from "../../apis/public/dtos/StoreInfoDto.ts";
import { CommonResponse } from "../../apis/common.response.ts";
import { ENDPOINT } from "../../constants/Endpoint.ts";

export const landing = createAsyncThunk<CommonResponse<StoreInfoDto>>(
  'public/landing',
  async () => {
    return await getService<StoreInfoDto>(ENDPOINT.GET_STORE);
  }
)
