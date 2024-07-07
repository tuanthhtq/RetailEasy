import { FeedbackDto } from "./dtos/feedback.dto.ts";
import { AxiosRequestConfig } from "axios";
import { ENDPOINT } from "../../constants/Endpoint.ts";
import { Interceptor } from "../Interceptor.ts";
import { CommonResponse } from "../common.response.ts";
import { ProductDetailDto } from "../dto/product.detail.dto.ts";
import { StoreSetupDto } from "./dtos/store.setup.dto.ts";
import { UserDto } from "../auth/dtos/user.dto.ts";

export const postService = async <T, I = null>(endpoint: ENDPOINT, data?: I): Promise<CommonResponse<T>>  => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
    data: data
  }
  return await Interceptor(config);
}

export const getService = async <T = null, I = null, P = null>(endpoint: ENDPOINT, data?: I, param?: P ): Promise<CommonResponse<T>>  => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: endpoint,
    data: data || null,
    params: {param} || null
  }
  return await Interceptor(config);
}

export const getProductDetailService
  = async (barcode: string): Promise<CommonResponse<ProductDetailDto>> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: ENDPOINT.GET_PRODUCT_DETAIL,
    params: { barcode }
  }
  return await Interceptor(config);
}

export const setupStoreServices = async (data: StoreSetupDto): Promise<CommonResponse<UserDto>> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: ENDPOINT.CREATE_ADMIN,
    data: data
  }
  return await Interceptor(config);
}
