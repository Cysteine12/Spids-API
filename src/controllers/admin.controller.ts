import { ValidationError } from '../middlewares/errorHandler'
import { adminService } from '../services'
import catchAsync from '../utils/catchAsync'
import exclude from '../utils/exclude'
import pick from '../utils/pick'
import {
  CreateAdminSchema,
  UpdateAdminRoleSchema,
  UpdateAdminSchema,
  UpdateProfileSchema,
} from '../validations/admin.validation'
import bcrypt from 'bcryptjs'

const getProfile = catchAsync((req, res) => {
  const user = req.user!

  const filteredUser = exclude(user, ['password', 'createdAt', 'updatedAt'])

  res.status(200).json({
    success: true,
    user: filteredUser,
  })
})

const updateProfile = catchAsync(async (req, res) => {
  const { id } = req.user!
  const newUser = pick(req.body as UpdateProfileSchema, [
    'firstName',
    'lastName',
  ])

  const updatedUser = await adminService.updateAdmin({ id }, newUser)

  const filteredUser = exclude(updatedUser, [
    'password',
    'createdAt',
    'updatedAt',
  ])

  res.status(200).json({
    success: true,
    user: filteredUser,
    message: 'Profile updated successfully',
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const newAdmin = pick(req.body as CreateAdminSchema, [
    'firstName',
    'lastName',
    'email',
    'password',
    'role',
  ])

  const admin = await adminService.findAdmin({ email: newAdmin.email })
  if (admin) throw new ValidationError('This email already exists')

  const salt = await bcrypt.genSalt(10)
  newAdmin.password = await bcrypt.hash(newAdmin.password, salt)

  const savedAdmin = await adminService.createAdmin(newAdmin)

  const filteredAdmin = exclude(savedAdmin, ['password'])

  res.status(200).json({
    success: true,
    data: filteredAdmin,
    message: 'Account created successfully',
  })
})

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const newAdmin = pick(req.body as UpdateAdminSchema, [
    'firstName',
    'lastName',
  ])

  const updatedAdmin = await adminService.updateAdmin({ id }, newAdmin)

  const filteredAdmin = exclude(updatedAdmin, ['password'])

  res.status(200).json({
    success: true,
    data: filteredAdmin,
    message: 'Account updated successfully',
  })
})

const updateAdminRole = catchAsync(async (req, res) => {
  const { id } = req.params
  const { role } = req.body as UpdateAdminRoleSchema

  const updatedAdmin = await adminService.updateAdmin({ id }, { role })

  const filteredAdmin = exclude(updatedAdmin, ['password'])

  res.status(200).json({
    success: true,
    data: filteredAdmin,
    message: 'Account role updated successfully',
  })
})

export default {
  getProfile,
  updateProfile,
  createAdmin,
  updateAdmin,
  updateAdminRole,
}
