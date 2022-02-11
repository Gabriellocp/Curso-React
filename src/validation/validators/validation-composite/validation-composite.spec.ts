import { FieldValidationSpy } from "@/validation/test"
import { ValidationComposite } from "./validation-composite"
import faker from 'faker'
type SutTypes = {
    sut: ValidationComposite
    fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (field: string): SutTypes => {
    const fieldValidationSpies = [
        new FieldValidationSpy(field),
        new FieldValidationSpy(field)
    ]

    const sut = ValidationComposite.build(fieldValidationSpies)

    return {
        sut,
        fieldValidationSpies
    }
}

describe('ValidationComposite', () => {
    test('Should return error if any validation fails', () => {
        const field = faker.database.column()
        const { sut, fieldValidationSpies } = makeSut(field)
        const mockedErrors = [
            faker.random.words(),
            faker.random.words()
        ]
        fieldValidationSpies[0].error = new Error(mockedErrors[0])
        fieldValidationSpies[1].error = new Error(mockedErrors[1])
        const error = sut.validate(field, faker.random.word())
        expect(error).toBe(mockedErrors[0])
    })
    test('Should return falsy if every validation succeeds', () => {
        const field = faker.database.column()
        const { sut } = makeSut(field)
        const error = sut.validate(field, faker.random.word())
        expect(error).toBeFalsy()
    })
})
