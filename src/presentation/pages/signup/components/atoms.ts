import { atom } from "recoil"

export const signupState = atom({
    key: 'signupState',
    default: {
        isLoading: false,
        isFormInvalid: true,
        mainError: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        emailError: '',
        passwordError: '',
        passwordConfirmationError: '',
        nameError: ''
    }
})