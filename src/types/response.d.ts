export interface APIResponse {
  success: boolean
  data?: any
  message?: string
}

export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export interface TokenResponse {
  token: string
  expires: number
}

export interface AuthTokenResponse {
  access: TokenResponse
  refresh: TokenResponse
}
