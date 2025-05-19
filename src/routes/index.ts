import { Router } from 'express'
import authRoute from './auth.route'
import adminRoute from './admin.route'
import studentRoute from './student.route'
import fingerprintRoute from './fingerprint.route'

const router = Router()

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/fingerprints',
    route: fingerprintRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
