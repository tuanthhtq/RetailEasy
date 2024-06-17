import { IUserDetail } from "./UserData.ts";


export interface IAuthResponse{
  status: number,
  data?: IUserDetail,
  message: string
}
