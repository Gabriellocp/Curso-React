import { Validation } from "@/presentation/protocols/validation"
import { FieldValidation } from "@/validation/protocols/field-validation"
import { FieldValidationSpy } from "../test/mock-field-validation"
import { ValidationComposite } from "./validation-composite"

type SutTypes = {
    sut: ValidationComposite
    fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
    const fieldValidationSpies = [
        new FieldValidationSpy('any'),
        new FieldValidationSpy('any')
    ]

    const sut = new ValidationComposite(fieldValidationSpies)

    return {
        sut,
        fieldValidationSpies
    }
}


describe('ValidationComposite', () => {
    test('Should return error if any validation fails', () => {
        const { sut, fieldValidationSpies } = makeSut()
        fieldValidationSpies[0].error = new Error('first_error')
        fieldValidationSpies[1].error = new Error('second_error')
        const error = sut.validate('any', 'any_value')
        expect(error).toBe('first_error')
    })
})


