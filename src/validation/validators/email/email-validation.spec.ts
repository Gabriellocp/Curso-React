import { InvalidFieldErrror } from "@/validation/errors/invalid-field-error"
import { EmailValidation } from "./email-validation"
import faker from 'faker'



describe('EmailValidation', () => {
    test('Should return error if email is invalid', () => {
        const field = faker.random.word()
        const sut = new EmailValidation(field)
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldErrror(field))

    })
    test('Should return false if email is valid', () => {
        const sut = new EmailValidation(faker.random.word())
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy()

    })


})