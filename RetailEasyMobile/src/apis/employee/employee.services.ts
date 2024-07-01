import { AxiosRequestConfig } from "axios";
import { ENDPOINT } from "../../constants/Endpoint.ts";
import { Interceptor } from "../Interceptor.ts";
import { CommonResponse } from "../common.response.ts";
import { BillsDto } from "../dto/bills.dto.ts";
import { mmkv } from "../../utils/MMKVProvider.ts";
import { auth_key } from "../../constants/Keys.ts";


export const getRecentBills = async (): Promise<CommonResponse<BillsDto[]>> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: ENDPOINT.GET_RECENT_BILL,
    headers: {
      Authorization: mmkv.getString(auth_key.token)
    }
  }
  return await Interceptor(config);
}
