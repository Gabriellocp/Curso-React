import { CompareFieldValidation } from "./compare-fields-validation"
import faker from 'faker'
import { InvalidFieldError } from "@/validation/errors/invalid-field-error"
const makeSut = (field, valueToCompare: string): CompareFieldValidation => new CompareFieldValidation(field, valueToCompare)

describe('CompareFieldValidation', () => {
    test('Should return error if compare is invalid', () => {
        const field = faker.database.column()
        const sut = makeSut(field, faker.random.word())
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError(field))
    })
})
