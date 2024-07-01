
export interface CommonResponse<T>{
  status: number,
  data?: T,
  message: string,
  additionalData: string,
  error: Map<string, string>
}
