import jwt from 'jsonwebtoken'
import { AuthTokenResponse } from '../types/response'
import { config } from '../config/config'
import { AdminRole } from '@prisma/client'

enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

const generateToken = (payload: object, secret: string, expiresIn: number) => {
  return jwt.sign(payload, secret, { expiresIn })
}

const generateAndSaveAuthTokens = async (
  userId: string,
  role: AdminRole
): Promise<AuthTokenResponse> => {
  const accessTokenExpires =
    config.jwt.ACCESS_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000
  const refreshTokenExpires =
    config.jwt.REFRESH_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000

  const accessToken = generateToken(
    {
      sub: userId,
      role: role,
      type: TokenType.ACCESS,
    },
    config.jwt.ACCESS_TOKEN_SECRET,
    accessTokenExpires
  )

  const refreshToken = generateToken(
    {
      sub: userId,
      role: role,
      type: TokenType.REFRESH,
    },
    config.jwt.REFRESH_TOKEN_SECRET,
    refreshTokenExpires
  )

  return {
    access: { token: accessToken, expires: accessTokenExpires },
    refresh: { token: refreshToken, expires: refreshTokenExpires },
  }
}

export default {
  generateToken,
  generateAndSaveAuthTokens,
}
