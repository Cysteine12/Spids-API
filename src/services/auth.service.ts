import prisma from '../config/prisma'
import { Prisma, Admin } from '@prisma/client'

export type AdminWhereUniqueInput = Prisma.AdminWhereUniqueInput

const findUser = async (
  payload: AdminWhereUniqueInput
): Promise<Admin | null> => {
  return await prisma.admin.findUnique({
    where: payload,
  })
}

export default {
  findUser,
}
