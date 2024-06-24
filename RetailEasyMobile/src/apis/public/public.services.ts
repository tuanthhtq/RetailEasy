import { FeedbackDto } from "./dtos/FeedbackDto.ts";
import axios, { AxiosRequestConfig } from "axios";
import { baseUrl, ENDPOINT } from "../../constants/Endpoint.ts";
import { Interceptor } from "../Interceptor.ts";
import { ICommonResponse } from "../CommonResponse.ts";
import { ProductDetailDto } from "../dto/productDetail.dto.ts";


export const sendFeedbackService = async (data: FeedbackDto) => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: ENDPOINT.SEND_FEEDBACK,
    data: data
  }
  return await Interceptor(config);
}

export const testServerConnectionService = async (): Promise<boolean>  => {
  try {
    await axios.get(ENDPOINT.GET_STORE);
    return true;
  } catch (error) {
    console.log({error});
    return false;
  }
}

export const getStoreInfoService = async () => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: ENDPOINT.GET_STORE,
  }
  return await Interceptor(config);
}

export const getProductDetailService
  = async (barcode: string): Promise<ICommonResponse<ProductDetailDto>> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: ENDPOINT.GET_PRODUCT_DETAIL,
    params: { barcode }
  }
  return await Interceptor(config);
}

export const anyUserExistsService = async () => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: ENDPOINT.ADMIN_EXISTS,
  }
  return await Interceptor(config);
}
