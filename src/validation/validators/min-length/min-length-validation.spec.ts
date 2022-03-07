import { MinLengthError } from "@/validation/errors/min-length-error"
import { MinLengthValidation } from "./min-length-validation"
import faker from 'faker'
const makeSut = (field: string, min: number): MinLengthValidation => new MinLengthValidation(field, min)

describe('MinLengthValidation', () => {
    test('Should return error if value is invalid', () => {
        const field = faker.database.column()
        const sut = makeSut(field, 5)
        const error = sut.validate({ [field]: faker.random.alphaNumeric(3) })
        expect(error).toEqual(new MinLengthError(5))
    })
    test('Should return false if value is valid', () => {
        const field = faker.database.column()
        const sut = makeSut(field, 5)
        const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
        expect(error).toBeFalsy()
    })
    test('Should return false if field does not exist', () => {
        const field = faker.database.column()
        const sut = makeSut(field, 5)
        const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
        expect(error).toBeFalsy()
    })

})
