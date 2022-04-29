import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators"
import { CompareFieldValidation } from "@/validation/validators/compare-fields/compare-fields-validation"
import { makeSignUpValidators } from "./validators-signup-factory"

describe('SignUpValidationFactory', () => {
    test('Should compose ValidationComposite with correct validations', () => {
        const composite = makeSignUpValidators()
        expect(composite).toEqual(ValidationComposite.build(
            [
                new RequiredFieldValidation('name'),
                new MinLengthValidation('name', 2),
                new RequiredFieldValidation('email'),
                new EmailValidation('email'),
                new RequiredFieldValidation('password'),
                new MinLengthValidation('password', 5),
                new RequiredFieldValidation('passwordConfirmation'),
                new MinLengthValidation('passwordConfirmation', 5),
                new CompareFieldValidation('passwordConfirmation', 'password')
            ]
        ))
    })
})
