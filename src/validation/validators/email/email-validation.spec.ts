import { InvalidFieldError } from "@/validation/errors/invalid-field-error"
import { EmailValidation } from "./email-validation"
import faker from 'faker'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
    test('Should return error if email is invalid', () => {
        const field = faker.random.word()
        const sut = makeSut(field)
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError(field))

    })
    test('Should return false if email is valid', () => {
        const sut = makeSut(faker.random.word())
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy()

    })

    test('Should return false if email is empty', () => {
        const sut = makeSut(faker.random.word())
        const error = sut.validate('')
        expect(error).toBeFalsy()

    })


})