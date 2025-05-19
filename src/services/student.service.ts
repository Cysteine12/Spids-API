import prisma from '../config/prisma'
import { Prisma, Student } from '@prisma/client'

export type StudentFindManyArgs = Prisma.StudentFindManyArgs
export type StudentWhereInput = Prisma.StudentWhereInput
export type StudentWhereUniqueInput = Prisma.StudentWhereUniqueInput
export type StudentCreateInput = Prisma.StudentCreateInput
export type StudentUncheckedCreateInput = Prisma.StudentUncheckedCreateInput
export type StudentUncheckedUpdateInput = Prisma.StudentUncheckedUpdateInput

const findStudents = async (
  filter?: StudentWhereInput,
  options?: StudentFindManyArgs & {
    page?: number
    limit?: number
  }
): Promise<Student[]> => {
  if (options?.page && options?.limit) {
    options.skip = (options?.page - 1) * options?.limit
  }

  return await prisma.student.findMany({
    where: filter,
    skip: options?.skip || 0,
    take: options?.limit || 20,
  })
}

const findStudent = async (
  filter: StudentWhereUniqueInput
): Promise<Student | null> => {
  return await prisma.student.findUnique({
    where: filter,
  })
}

const createStudent = async (
  payload: StudentUncheckedCreateInput
): Promise<Student> => {
  return await prisma.student.create({
    data: payload,
  })
}

const updateStudent = async (
  filter: StudentWhereUniqueInput,
  payload: StudentUncheckedUpdateInput
): Promise<Student> => {
  return await prisma.student.update({
    where: filter,
    data: payload,
  })
}

const deleteStudent = async (
  filter: StudentWhereUniqueInput
): Promise<Student | null> => {
  return await prisma.student.delete({
    where: filter,
  })
}

export default {
  findStudents,
  findStudent,
  createStudent,
  updateStudent,
  deleteStudent,
}
