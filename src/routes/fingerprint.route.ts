import express from 'express'
import { fingerprintController } from '../controllers'
import passport from 'passport'
import { authorize } from '../middlewares/authorize'
import { validate } from '../middlewares/validate'
import { fingerprintValidation } from '../validations'

const router = express.Router()

router.get(
  '/student/:studentId',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'AUTHENTICATOR', 'ENROLLER']),
  fingerprintController.getFingerprintsByStudent
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'ENROLLER']),
  validate(fingerprintValidation.createFingerprintSchema),
  fingerprintController.createFingerprint
)

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'ENROLLER']),
  validate(fingerprintValidation.updateFingerprintSchema),
  fingerprintController.updateFingerprint
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'ENROLLER']),
  fingerprintController.deleteFingerprint
)

export default router
