import prisma from '../config/prisma'
import { Prisma, Fingerprint } from '@prisma/client'

export type FingerprintFindManyArgs = Prisma.FingerprintFindManyArgs
export type FingerprintWhereInput = Prisma.FingerprintWhereInput
export type FingerprintWhereUniqueInput = Prisma.FingerprintWhereUniqueInput
export type FingerprintCreateInput = Prisma.FingerprintCreateInput
export type FingerprintUncheckedCreateInput =
  Prisma.FingerprintUncheckedCreateInput
export type FingerprintUncheckedUpdateInput =
  Prisma.FingerprintUncheckedUpdateInput

const findFingerprints = async (
  filter?: FingerprintWhereInput,
  options?: FingerprintFindManyArgs & {
    page?: number
    limit?: number
  }
): Promise<Fingerprint[]> => {
  if (options?.page && options?.limit) {
    options.skip = (options?.page - 1) * options?.limit
  }

  return await prisma.fingerprint.findMany({
    where: filter,
    skip: options?.skip || 0,
    take: options?.limit || 20,
  })
}

const findFingerprint = async (
  filter: FingerprintWhereUniqueInput
): Promise<Fingerprint | null> => {
  return await prisma.fingerprint.findUnique({
    where: filter,
  })
}

const createFingerprint = async (
  payload: FingerprintUncheckedCreateInput
): Promise<Fingerprint> => {
  return await prisma.fingerprint.create({
    data: payload,
  })
}

const updateFingerprint = async (
  filter: FingerprintWhereUniqueInput,
  payload: FingerprintUncheckedUpdateInput
): Promise<Fingerprint> => {
  return await prisma.fingerprint.update({
    where: filter,
    data: payload,
  })
}

const deleteFingerprint = async (
  filter: FingerprintWhereUniqueInput
): Promise<Fingerprint | null> => {
  return await prisma.fingerprint.delete({
    where: filter,
  })
}

export default {
  findFingerprints,
  findFingerprint,
  createFingerprint,
  updateFingerprint,
  deleteFingerprint,
}
