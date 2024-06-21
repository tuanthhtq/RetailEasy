import { ILoginRequest } from "./dtos/LoginRequest.ts";
import { AxiosRequestConfig } from "axios";
import { ENDPOINT } from "../../constants/Endpoint.ts";
import { Interceptor } from "../Interceptor.ts";
import { IAuthResponse } from "./dtos/AuthResponse.ts";
import { ICreateAccountRequest } from "./dtos/CreateAccountRequest.ts";


export const loginService = async (data: ILoginRequest): Promise<IAuthResponse> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: ENDPOINT.LOGIN,
    data: data
  }
  return await Interceptor(config);
}

export const createAccountService = async (data: ICreateAccountRequest): Promise<IAuthResponse> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: !data.storeName ? ENDPOINT.REGISTER : ENDPOINT.CREATE_ADMIN,
    data: data
  }
  return await Interceptor(config);
}

// export const getAccountInformation = async (token: string): Promise<IAuthResponse> => {
//   const config: AxiosRequestConfig = {
//     method: 'POST',
//     url: !data.storeName ? ENDPOINT.REGISTER : ENDPOINT.CREATE_ADMIN,
//     data: data
//   }
//   return await Interceptor(config);
// }

