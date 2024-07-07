import { ROLES } from "../../../constants/Roles.ts";


export interface CreateAccountRequestDto {
  username: string,
  idNumber: string,
  phone: string,
  email: string,
  password: string,
  fullName: string,
  address: string,
  storeName?: string,
  roles: ROLES
}
