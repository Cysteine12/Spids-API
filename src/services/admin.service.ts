import prisma from '../config/prisma'
import { Prisma, Admin } from '@prisma/client'

export type AdminWhereInput = Prisma.AdminWhereInput
export type AdminFindManyArgs = Prisma.AdminFindManyArgs
export type AdminCreateInput = Prisma.AdminCreateInput
export type AdminFindUniqueArgs = Prisma.AdminFindUniqueArgs
export type AdminUpdateInput = Prisma.AdminUpdateInput
export type AdminWhereUniqueInput = Prisma.AdminWhereUniqueInput

const findAdmins = async (
  filter: AdminWhereInput,
  options?: AdminFindManyArgs & {
    page?: number
    limit?: number
  }
): Promise<Omit<Admin, 'password'>[]> => {
  if (options?.page && options?.limit) {
    options.skip = (options?.page - 1) * options?.limit
  }

  return await prisma.admin.findMany({
    where: filter,
    skip: options?.skip || 0,
    take: options?.limit || 20,
    omit: { password: true },
  })
}

const findAdmin = async (
  filter: AdminWhereUniqueInput,
  options?: AdminFindUniqueArgs
): Promise<Partial<Admin> | null> => {
  return await prisma.admin.findUnique({
    where: filter,
    select: options?.select,
  })
}

const createAdmin = async (payload: AdminCreateInput): Promise<Admin> => {
  return await prisma.admin.create({
    data: payload,
  })
}

const updateAdmin = async (
  filter: AdminWhereUniqueInput,
  payload: AdminUpdateInput
): Promise<Admin> => {
  return await prisma.admin.update({
    where: filter,
    data: payload,
  })
}

export default {
  findAdmins,
  findAdmin,
  createAdmin,
  updateAdmin,
}
