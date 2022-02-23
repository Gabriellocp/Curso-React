import { InvalidFieldError } from "@/validation/errors/invalid-field-error"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class CompareFieldValidation implements FieldValidation {
    constructor(
        readonly field: string,
        private readonly valueToCompare: string
    ) { }

    validate(value: string): Error {
        return value !== this.valueToCompare ? new InvalidFieldError(this.field) : null
    }
}