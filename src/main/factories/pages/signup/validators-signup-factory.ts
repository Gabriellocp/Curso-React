import { ValidationComposite } from "@/validation/validators"
import { ValidationBuilder } from "@/validation/validators/builder/validation-builder"

export const makeSignUpValidators = (): ValidationComposite => {
    return ValidationComposite.build(
        [...ValidationBuilder.field('name').required().min(2).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
        ...ValidationBuilder.field('passwordConfirmation').required().min(5).sameAs('password').build()
        ]
    )
}
