import { InvalidFieldError } from "@/validation/errors/invalid-field-error"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class EmailValidation implements FieldValidation {
    constructor(readonly field: string) { }
    validate(value: string): Error {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        return (emailRegex.test(value) || !value) ? null : new InvalidFieldError(this.field)
    }
}
