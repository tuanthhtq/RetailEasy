import { LoginRequestDto } from "./dtos/login.request.ts";
import { AxiosRequestConfig } from "axios";
import { ENDPOINT } from "../../constants/Endpoint.ts";
import { Interceptor } from "../Interceptor.ts";
import { AuthResponseDto } from "./dtos/auth.response.ts";
import { CreateAccountRequestDto } from "./dtos/create.account.request.ts";


export const loginService = async (data: LoginRequestDto): Promise<AuthResponseDto> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: ENDPOINT.LOGIN,
    data: data
  }
  console.log(config)
  return await Interceptor(config);
}

export const createAccountService = async (data: CreateAccountRequestDto): Promise<AuthResponseDto> => {
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

