import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import Signup from './signup'
import { Helper } from '@/presentation/test'
type SutTypes = {
    sut: RenderResult
}

const makeSut = (): SutTypes => {
    const sut = render(<Signup />)
    return { sut }
}

describe('Signup Component', () => {

    test('Should start with initial components disabled', () => {
        const validationError = 'Campo obrigatório'
        const { sut } = makeSut()
        Helper.testChildCount(sut, 'error-wrap', 0)
        Helper.testButtonIsDisabled(sut, 'submit', true)
        Helper.testStatusForFields(sut, 'name', validationError)
        Helper.testStatusForFields(sut, 'email', validationError)
        Helper.testStatusForFields(sut, 'password', validationError)
        Helper.testStatusForFields(sut, 'passwordConfirmation', validationError)

    })
})
