import { CompareFieldValidation } from "./compare-fields-validation"
import faker from 'faker'
import { InvalidFieldError } from "@/validation/errors/invalid-field-error"
const makeSut = (field: string, fieldToCompare: string): CompareFieldValidation => new CompareFieldValidation(field, fieldToCompare)

describe('CompareFieldValidation', () => {
    test('Should return error if compare is invalid', () => {
        const field = faker.database.column()
        const fieldToCompare = faker.random.word()
        const sut = makeSut(field, faker.random.word())
        const error = sut.validate(
            {
                [field]: faker.random.word(),
                [fieldToCompare]: faker.random.word()

            }
        )
        expect(error).toEqual(new InvalidFieldError(field))
    })
    test('Should return falsy if compare is valid', () => {
        const field = faker.database.column()
        const fieldToCompare = faker.random.word()
        const value = faker.random.word()
        const sut = makeSut(field, fieldToCompare)
        const error = sut.validate(
            {
                [field]: value,
                [fieldToCompare]: value

            }
        )
        expect(error).toBeFalsy()
    })
})
