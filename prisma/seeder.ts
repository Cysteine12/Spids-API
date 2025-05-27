import { faker } from '@faker-js/faker'
import { CreateStudentSchema } from '../src/validations'
import { studentService } from '../src/services'

const createRandomStudent = (): CreateStudentSchema => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email({ allowSpecialCharacters: false }),
  matricNo: faker.string.alphanumeric(9).toUpperCase(),
})

const fakeStudents = faker.helpers.multiple(createRandomStudent, {
  count: 30,
})

const seed = async () => {
  try {
    const createStudentPromises = fakeStudents.map((fakeStudent) => {
      studentService.createStudent(fakeStudent)
    })

    await Promise.all(createStudentPromises)

    console.log('Student table seeded successfully!')
  } catch (err) {
    console.error(err)
  }
}

seed()
