import { InvalidFieldError } from "@/validation/errors/invalid-field-error"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class EmailValidation implements FieldValidation {
    constructor(readonly field: string) { }
    validate(input: object): Error {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        return (emailRegex.test(input[this.field]) || !input[this.field]) ? null : new InvalidFieldError(this.field)
    }
}
