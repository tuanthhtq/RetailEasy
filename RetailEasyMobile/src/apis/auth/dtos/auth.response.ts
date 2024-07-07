import { UserDto } from "./user.dto.ts";


export interface AuthResponseDto {
  status: number,
  data?: UserDto,
  message: string,
  error: Map<string, string>
}
