import bcrypt from 'bcryptjs'
import { NotFoundError, ValidationError } from '../middlewares/errorHandler'
import { authService, tokenService } from '../services'
import { Admin } from '@prisma/client'
import { LoginSchema } from '../validations/auth.validation'
import catchAsync from '../utils/catchAsync'
import exclude from '../utils/exclude'
import { cookieConfig } from '../utils/cookieConfig'

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
  logout,
}
