import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import Signup from './signup'
import { Helper, ValidationSpy, AddAccountSpy } from '@/presentation/test'
import faker from 'faker'
type SutTypes = {
    sut: RenderResult
    addAccountSpy: AddAccountSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()
    const addAccountSpy = new AddAccountSpy()
    validationSpy.errorMessage = params?.validationError

    const sut = render(<Signup validation={validationSpy} addAccount={addAccountSpy} />)
    return {
        sut,
        addAccountSpy
    }
}

const simulateValidSubmit = async (sut: RenderResult, name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField(sut, 'name', name)
    Helper.populateField(sut, 'email', email)
    Helper.populateField(sut, 'password', password)
    Helper.populateField(sut, 'passwordConfirmation', password)

    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
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
    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'name')
        Helper.populateField(sut, 'email')
        Helper.populateField(sut, 'password')
        Helper.populateField(sut, 'passwordConfirmation')
        Helper.testButtonIsDisabled(sut, 'submit', false)
    })
    test('Should show loading spinner on submit', async () => {
        const { sut } = makeSut()
        await simulateValidSubmit(sut)
        Helper.testElementExists(sut, 'spinner')
    })
    test('Should call AddAccount with correct values', async () => {
        const { sut, addAccountSpy } = makeSut()
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        await simulateValidSubmit(sut, name, email, password)
        expect(addAccountSpy.params).toEqual({
            name,
            email,
            password,
            passwordConfirmation: password
        })
    })
    test('Should call AddAccount only once', async () => {
        const { sut, addAccountSpy } = makeSut()
        await simulateValidSubmit(sut)
        await simulateValidSubmit(sut)
        expect(addAccountSpy.callsCount).toBe(1)
    })
    test('Should not call AddAccount if form is invalid', () => {
        const validationError = faker.random.words()
        const { sut, addAccountSpy } = makeSut({ validationError })
        fireEvent.submit(sut.getByTestId('form'))
        expect(addAccountSpy.callsCount).toBe(0)
    })
})
