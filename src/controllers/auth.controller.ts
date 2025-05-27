import bcrypt from 'bcryptjs'
import { NotFoundError, ValidationError } from '../middlewares/errorHandler'
import { authService, tokenService } from '../services'
import { Admin } from '@prisma/client'
import catchAsync from '../utils/catchAsync'
import exclude from '../utils/exclude'
import { cookieConfig } from '../utils/cookieConfig'
import { LoginSchema } from '../validations'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

const login = catchAsync(async (req, res) => {
  const { email, password }: LoginSchema = req.body

  let user = await authService.findUser({ email: email })
  if (!user) throw new NotFoundError('Invalid credentials')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new ValidationError('Invalid credentials')

  const { access, refresh } = await tokenService.generateAndSaveAuthTokens(
    user.id,
    user.role
  )

  res.cookie('accessToken', access.token, cookieConfig(access.expires))
  res.cookie('refreshToken', refresh.token, cookieConfig(refresh.expires))

  let filteredUser = exclude<Admin>(user, [
    'password',
    'createdAt',
    'updatedAt',
  ])

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: filteredUser,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) throw new ValidationError('No refresh token')

  jwt.verify(
    refreshToken,
    config.jwt.REFRESH_TOKEN_SECRET,
    async (err: any, payload: any) => {
      if (err) throw new ValidationError('Invalid or expired token')

      const { access, refresh } = await tokenService.generateAndSaveAuthTokens(
        payload.sub,
        payload.role
      )

      res.cookie('accessToken', access.token, cookieConfig(access.expires))
      res.cookie('refreshToken', refresh.token, cookieConfig(refresh.expires))

      res.status(200).json({
        success: true,
        message: 'Tokens refreshed successfully',
      })
    }
  )
})

const logout = catchAsync(async (req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  })
})

export default {
  login,
  refreshToken,
  logout,
}
