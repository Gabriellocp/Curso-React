import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import React from 'react'
import Signup from './signup'
import { Helper, ValidationSpy } from '@/presentation/test'
import faker from 'faker'
type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()
    validationSpy.errorMessage = params?.validationError

    const sut = render(<Signup validation={validationSpy} />)
    return { sut }
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.words()): void => {
    const input = sut.getByTestId(fieldName)
    fireEvent.input(input, { target: { value } })

}

describe('Signup Component', () => {
    afterEach(cleanup)
    test('Should start with initial components disabled', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.testChildCount(sut, 'error-wrap', 0)
        Helper.testButtonIsDisabled(sut, 'submit', true)
        Helper.testStatusForFields(sut, 'name', validationError)
        Helper.testStatusForFields(sut, 'email', 'Campo obrigatório')
        Helper.testStatusForFields(sut, 'password', 'Campo obrigatório')
        Helper.testStatusForFields(sut, 'passwordConfirmation', 'Campo obrigatório')

    })

    test('Should show name error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populateField(sut, 'name')
        Helper.testStatusForFields(sut, 'name', validationError)
    })
})
