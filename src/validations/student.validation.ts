import { z } from 'zod'

const createStudentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  matricNo: z.string(),
})

export type CreateStudentSchema = z.infer<typeof createStudentSchema>

const updateStudentSchema = createStudentSchema.partial()

export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>

export default {
  createStudentSchema,
  updateStudentSchema,
}
