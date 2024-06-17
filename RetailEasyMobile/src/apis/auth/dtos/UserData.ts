import { ROLES } from "../../../constants/Roles.ts";


export interface IUserDetail {
  username: string,
  idNumber: string,
  fullName: string,
  email: string,
  phone: string,
  password: string,
  token: string,
  address: string,
  roles: ROLES
}
