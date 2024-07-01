import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommonResponse } from "../../apis/common.response.ts";
import { postService } from "../../apis/public/public.services.ts";
import { ENDPOINT } from "../../constants/Endpoint.ts";


export const storeInitialState = createAsyncThunk<CommonResponse<boolean>> (
  'auth/admin-exists',
  async () => {
    return await postService<boolean>(ENDPOINT.ADMIN_EXISTS)
  }
)
