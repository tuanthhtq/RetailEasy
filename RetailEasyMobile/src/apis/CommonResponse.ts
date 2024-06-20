
export interface ICommonResponse<T>{
  status: number,
  data?: T,
  message: string,
  additionalData: string,
  error: Map<string, string>
}
