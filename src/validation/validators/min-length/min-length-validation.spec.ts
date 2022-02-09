import { MinLengthError } from "@/validation/errors/min-length-error"
import { MinLengthValidation } from "./min-length-validation"
import faker from 'faker'
const makeSut = (min: number): MinLengthValidation => new MinLengthValidation(faker.database.column(), min)

describe('MinLengthValidation', () => {
    test('Should return error if value is invalid', () => {
        const sut = makeSut(5)
        const error = sut.validate(faker.random.alphaNumeric(3))
        expect(error).toEqual(new MinLengthError(5))
    })
    test('Should return false if value is valid', () => {
        const sut = makeSut(5)
        const error = sut.validate(faker.random.alphaNumeric(5))
        expect(error).toBeFalsy()
    })
})



