import { NotFoundError } from '../middlewares/errorHandler'
import { fingerprintService } from '../services'
import catchAsync from '../utils/catchAsync'
import pick from '../utils/pick'
import {
  CreateFingerprintSchema,
  UpdateFingerprintSchema,
} from '../validations'

const getFingerprintsByStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const query = pick(req.query, ['page', 'limit'])
  const options = { page: Number(query.page), limit: Number(query.limit) }

  const fingerprints = await fingerprintService.findFingerprints(
    { studentId },
    options
  )

  const encodedFingerprints = fingerprints.map((fingerprint) => ({
    ...fingerprint,
    template: Buffer.from(fingerprint.template).toString('base64'),
  }))

  res.status(200).json({
    success: true,
    data: encodedFingerprints,
  })
})

const createFingerprint = catchAsync(async (req, res) => {
  const payload = pick(req.body as CreateFingerprintSchema, [
    'studentId',
    'template',
    'type',
  ])

  const newFingerprint = {
    ...payload,
    template: Buffer.from(payload.template, 'base64'),
  }

  await fingerprintService.createFingerprint(newFingerprint)

  res.status(201).json({
    success: true,
    message: 'Fingerprint saved successfully',
  })
})

const updateFingerprint = catchAsync(async (req, res) => {
  const id = req.params.id
  const payload = pick(req.body as UpdateFingerprintSchema, [
    'studentId',
    'template',
    'type',
  ])

  const newFingerprint = {
    ...payload,
    template: Buffer.from(payload.template, 'base64'),
  }

  const updatedFingerprint = await fingerprintService.updateFingerprint(
    { id },
    newFingerprint
  )
  if (!updatedFingerprint) throw new NotFoundError('Fingerprint not found')

  res.status(201).json({
    success: true,
    message: 'Fingerprint updated successfully',
  })
})

const deleteFingerprint = catchAsync(async (req, res) => {
  const id = req.params.id

  const deletedFingerprint = await fingerprintService.deleteFingerprint({ id })
  if (!deletedFingerprint) throw new NotFoundError('Fingerprint not found')

  res.status(200).json({
    success: true,
    message: 'Fingerprint deleted successfully',
  })
})

export default {
  getFingerprintsByStudent,
  createFingerprint,
  updateFingerprint,
  deleteFingerprint,
}
