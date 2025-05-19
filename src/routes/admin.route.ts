import express from 'express'
import passport from 'passport'
import { adminController } from '../controllers'
import { validate } from '../middlewares/validate'
import { adminValidation } from '../validations'
import { authorize } from '../middlewares/authorize'

const router = express.Router()

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  adminController.getProfile
)

router.patch(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  validate(adminValidation.updateProfileSchema),
  adminController.updateProfile
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN']),
  validate(adminValidation.createAdminSchema),
  adminController.createAdmin
)

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN']),
  validate(adminValidation.updateAdminSchema),
  adminController.updateAdmin
)

router.patch(
  '/:id/role',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN']),
  validate(adminValidation.updateAdminRoleSchema),
  adminController.updateAdminRole
)

export default router
