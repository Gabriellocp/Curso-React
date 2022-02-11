import { ValidationComposite } from "@/validation/validators"
import { ValidationBuilder } from "@/validation/validators/builder/validation-builder"
import { makeLoginValidators } from "./validators-login-factory"

describe('LoginValidationFactory', () => {
    test('Should compose ValidationComposite with correct validations', () => {
        const composite = makeLoginValidators()
        expect(composite).toEqual(ValidationComposite.build(
            [
                ...ValidationBuilder.field('email').required().email().build(),
                ...ValidationBuilder.field('password').required().min(5).build()

            ]
        ))
    })
})
