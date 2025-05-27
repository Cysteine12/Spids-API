import { NotFoundError } from '../middlewares/errorHandler'
import { studentService } from '../services'
import { StudentWhereInput } from '../services/student.service'
import catchAsync from '../utils/catchAsync'
import pick from '../utils/pick'
import { CreateStudentSchema, UpdateStudentSchema } from '../validations'

const getStudents = catchAsync(async (req, res) => {
  const query = pick(req.query, ['page', 'limit'])
  const options = { page: Number(query.page), limit: Number(query.limit) }

  const [students, total] = await studentService.findStudents({}, options)

  res.status(200).json({
    success: true,
    data: students,
    total: total,
  })
})

const searchStudentsByMatric = catchAsync(async (req, res) => {
  const query = pick(req.query, ['page', 'limit', 'search'])

  const filter: StudentWhereInput = { matricNo: { contains: query.search } }
  const options = { page: Number(query.page), limit: Number(query.limit) }

  const [students] = await studentService.findStudents(filter, options)

  res.status(200).json({
    success: true,
    data: students,
  })
})

const getStudent = catchAsync(async (req, res) => {
  const { id } = req.params

  const student = await studentService.findStudent({ id })
  if (!student) throw new NotFoundError('Student not found')

  const parsedFingerPrint = student.fingerprints.map((fingerprint) => ({
    ...fingerprint,
    template: Buffer.from(fingerprint.template).toString('base64'),
  }))

  const parsedStudent = { ...student, fingerprints: parsedFingerPrint }

  res.status(200).json({
    success: true,
    data: parsedStudent,
  })
})

const createStudent = catchAsync(async (req, res) => {
  const newStudent = pick(req.body as CreateStudentSchema, [
    'firstName',
    'lastName',
    'email',
    'matricNo',
  ])

  const savedStudent = await studentService.createStudent(newStudent)

  res.status(201).json({
    success: true,
    data: savedStudent,
    message: 'Student created successfully',
  })
})

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id
  const newStudent = pick(req.body as UpdateStudentSchema, [
    'firstName',
    'lastName',
    'email',
    'matricNo',
  ])

  const updatedStudent = await studentService.updateStudent({ id }, newStudent)
  if (!updatedStudent) throw new NotFoundError('Student not found')

  res.status(201).json({
    success: true,
    message: 'Student updated successfully',
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id

  const deletedStudent = await studentService.deleteStudent({ id })
  if (!deletedStudent) throw new NotFoundError('Student not found')

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
  })
})

export default {
  getStudents,
  searchStudentsByMatric,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
}
