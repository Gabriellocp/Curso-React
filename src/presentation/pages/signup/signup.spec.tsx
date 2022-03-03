import { render, RenderResult, cleanup } from '@testing-library/react'
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

describe('Signup Component', () => {
    afterEach(cleanup)
    test('Should start with initial components disabled', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.testChildCount(sut, 'error-wrap', 0)
        Helper.testButtonIsDisabled(sut, 'submit', true)
        Helper.testStatusForFields(sut, 'name', validationError)
        Helper.testStatusForFields(sut, 'email', validationError)
        Helper.testStatusForFields(sut, 'password', validationError)
        Helper.testStatusForFields(sut, 'passwordConfirmation', validationError)

    })

    test('Should show name error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.populateField(sut, 'name')
        Helper.testStatusForFields(sut, 'name', validationError)
    })
    test('Should show email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.populateField(sut, 'email')
        Helper.testStatusForFields(sut, 'email', validationError)
    })
    test('Should show password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.populateField(sut, 'password')
        Helper.testStatusForFields(sut, 'password', validationError)
    })
    test('Should show password confirmation error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.populateField(sut, 'passwordConfirmation')
        Helper.testStatusForFields(sut, 'passwordConfirmation', validationError)
    })
    test('Should show valid name state if Validation succeeds', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'name')
        Helper.testStatusForFields(sut, 'name')
    })
    test('Should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'email')
        Helper.testStatusForFields(sut, 'email')
    })
    test('Should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'password')
        Helper.testStatusForFields(sut, 'password')
    })
    test('Should show valid password confirmation state if Validation succeeds', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'passwordConfirmation')
        Helper.testStatusForFields(sut, 'passwordConfirmation')
    })
})
