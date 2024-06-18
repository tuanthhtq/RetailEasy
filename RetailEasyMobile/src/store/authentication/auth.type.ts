export interface IAuthState {
  isAuthenticated: boolean
  accessToken: string | null
  phoneNumber: string | null
  fullName: string | null
  isLoading: boolean
  message: string | null
}

