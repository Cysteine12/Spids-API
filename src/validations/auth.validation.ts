import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
})

export type LoginSchema = z.infer<typeof loginSchema>

export default {
  loginSchema,
}
