import express from 'express'
import { studentController } from '../controllers'
import passport from 'passport'
import { authorize } from '../middlewares/authorize'
import { validate } from '../middlewares/validate'
import { studentValidation } from '../validations'

const router = express.Router()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'AUTHENTICATOR', 'ENROLLER']),
  studentController.getStudents
)

router.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'AUTHENTICATOR', 'ENROLLER']),
  studentController.searchStudentsByMatric
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'AUTHENTICATOR', 'ENROLLER']),
  studentController.getStudent
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'ENROLLER']),
  validate(studentValidation.createStudentSchema),
  studentController.createStudent
)

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'ENROLLER']),
  validate(studentValidation.updateStudentSchema),
  studentController.updateStudent
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorize(['SUPERADMIN', 'ENROLLER']),
  studentController.deleteStudent
)

export default router
