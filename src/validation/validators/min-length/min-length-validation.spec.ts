import { MinLengthError } from "@/validation/errors/min-length-error"
import { MinLengthValidation } from "./min-length-validation"

describe('MinLengthValidation', () => {
    test('Should return error if value is invalid', () => {
        const sut = new MinLengthValidation('field', 5)
        const error = sut.validate('123')
        expect(error).toEqual(new MinLengthError(5))
    })
    test('Should return false if value is valid', () => {
        const sut = new MinLengthValidation('field', 5)
        const error = sut.validate('12345')
        expect(error).toBeFalsy()
    })
})



