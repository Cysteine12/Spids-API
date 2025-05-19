import express from 'express'
import { authController } from '../controllers'
import { validate } from '../middlewares/validate'
import { authValidation } from '../validations'

const router = express.Router()

router.post(
  '/login',
  validate(authValidation.loginSchema),
  authController.login
)

router.post('/logout', authController.logout)

export default router
