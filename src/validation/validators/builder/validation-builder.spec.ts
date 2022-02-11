import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from "@/validation/validators"
import { ValidationBuilder as sut } from "./validation-builder"
import faker from 'faker'
describe('ValidationBuilder', () => {
    test('Should return RequiredFieldValidation', () => {
        const field = faker.database.column()
        const validations = sut.field(field).required().build()
        expect(validations).toEqual([new RequiredFieldValidation(field)])
    })
    test('Should return EmailValidation', () => {
        const field = faker.database.column()
        const validations = sut.field(field).email().build()
        expect(validations).toEqual([new EmailValidation(field)])
    })
    test('Should return MinLengthValidation', () => {
        const field = faker.database.column()
        const num = faker.random.number()
        const validations = sut.field(field).min(num).build()
        expect(validations).toEqual([new MinLengthValidation(field, num)])
    })
    test('Should return List of validations', () => {
        const field = faker.database.column()
        const num = faker.random.number()
        const validations = sut.field(field).required().email().min(num).build()
        expect(validations).toEqual([
            new RequiredFieldValidation(field),
            new EmailValidation(field),
            new MinLengthValidation(field, num)
        ])
    })

})
