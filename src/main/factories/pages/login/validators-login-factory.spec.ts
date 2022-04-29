import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators"
import { makeLoginValidators } from "./validators-login-factory"

describe('LoginValidationFactory', () => {
    test('Should compose ValidationComposite with correct validations', () => {
        const composite = makeLoginValidators()
        expect(composite).toEqual(ValidationComposite.build(
            [
                new RequiredFieldValidation('email'),
                new EmailValidation('email'),
                new RequiredFieldValidation('password'),
                new MinLengthValidation('password', 5),


            ]
        ))
    })
})
