import { ValidationComposite } from "@/validation/validators"
import { ValidationBuilder } from "@/validation/validators/builder/validation-builder"
import { makeSignUpValidators } from "./validators-signup-factory"

describe('SignUpValidationFactory', () => {
    test('Should compose ValidationComposite with correct validations', () => {
        const composite = makeSignUpValidators()
        expect(composite).toEqual(ValidationComposite.build(
            [...ValidationBuilder.field('name').required().build(),
            ...ValidationBuilder.field('email').required().email().build(),
            ...ValidationBuilder.field('password').required().min(5).build(),
            ...ValidationBuilder.field('passwordConfirmation').required().min(5).sameAs('password').build()
            ]
        ))
    })
})
