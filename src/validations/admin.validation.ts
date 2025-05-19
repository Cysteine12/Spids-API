import { z } from 'zod'
import { AdminRole } from '@prisma/client'

const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

const createAdminSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(7),
  role: z.nativeEnum(AdminRole),
})

export type CreateAdminSchema = z.infer<typeof createAdminSchema>

const updateAdminSchema = createAdminSchema
  .partial()
  .pick({ firstName: true, lastName: true })

export type UpdateAdminSchema = z.infer<typeof updateAdminSchema>

const updateAdminRoleSchema = z.object({
  role: z.nativeEnum(AdminRole),
})

export type UpdateAdminRoleSchema = z.infer<typeof updateAdminRoleSchema>

export default {
  updateProfileSchema,
  createAdminSchema,
  updateAdminSchema,
  updateAdminRoleSchema,
}
