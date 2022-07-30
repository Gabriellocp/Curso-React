import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import React from 'react'
import Signup from './signup'
import { Helper, ValidationSpy, AddAccountSpy } from '@/presentation/test'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { EmailInUseError } from '@/domain/errors'
import { Router } from 'react-router-dom'
import { AddAccount } from '@/domain/usecases'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/components'
import { mockAccountModel } from '@/domain/test'
type SutTypes = {
    addAccountSpy: AddAccountSpy
    setCurrentAccountMock: (account: AddAccount.Model) => void
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()
    const addAccountSpy = new AddAccountSpy()
    const setCurrentAccountMock = jest.fn()
    validationSpy.errorMessage = params?.validationError
    const mockedState = {setCurrentAccount: setCurrentAccountMock, getCurrentAccount: ()=> mockAccountModel()}

    render(
        <RecoilRoot initializeState={({set})=> set(currentAccountState,mockedState)}>
                <Router history={history} >
                    <Signup validation={validationSpy} addAccount={addAccountSpy} />
                </Router>
        </RecoilRoot>
    )
    return {
        addAccountSpy,
        setCurrentAccountMock
    }
}

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField('name', name)
    Helper.populateField('email', email)
    Helper.populateField('password', password)
    Helper.populateField('passwordConfirmation', password)

    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

describe('Signup Component', () => {
    test('Should start with initial components disabled', () => {
        const validationError = faker.random.words()
        makeSut({ validationError })
        expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
        expect(screen.getByTestId('submit')).toBeDisabled()
        Helper.testStatusForFields('name', validationError)
        Helper.testStatusForFields('email', validationError)
        Helper.testStatusForFields('password', validationError)
        Helper.testStatusForFields('passwordConfirmation', validationError)

    })

    test('Should show name error if validation fails', () => {
        const validationError = faker.random.words()
        makeSut({ validationError })
        Helper.populateField('name')
        Helper.testStatusForFields('name', validationError)
    })
    test('Should show email error if validation fails', () => {
        const validationError = faker.random.words()
        makeSut({ validationError })
        Helper.populateField('email')
        Helper.testStatusForFields('email', validationError)
    })
    test('Should show password error if validation fails', () => {
        const validationError = faker.random.words()
        makeSut({ validationError })
        Helper.populateField('password')
        Helper.testStatusForFields('password', validationError)
    })
    test('Should show password confirmation error if validation fails', () => {
        const validationError = faker.random.words()
        makeSut({ validationError })
        Helper.populateField('passwordConfirmation')
        Helper.testStatusForFields('passwordConfirmation', validationError)
    })
    test('Should show valid name state if Validation succeeds', () => {
        makeSut()
        Helper.populateField('name')
        Helper.testStatusForFields('name')
    })
    test('Should show valid email state if Validation succeeds', () => {
        makeSut()
        Helper.populateField('email')
        Helper.testStatusForFields('email')
    })
    test('Should show valid password state if Validation succeeds', () => {
        makeSut()
        Helper.populateField('password')
        Helper.testStatusForFields('password')
    })
    test('Should show valid password confirmation state if Validation succeeds', () => {
        makeSut()
        Helper.populateField('passwordConfirmation')
        Helper.testStatusForFields('passwordConfirmation')
    })
    test('Should enable submit button if form is valid', () => {
        makeSut()
        Helper.populateField('name')
        Helper.populateField('email')
        Helper.populateField('password')
        Helper.populateField('passwordConfirmation')
        expect(screen.getByTestId('submit')).toBeEnabled()
    })
    test('Should show loading spinner on submit', async () => {
        makeSut()
        await simulateValidSubmit()
        expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    })
    test('Should call AddAccount with correct values', async () => {
        const { addAccountSpy } = makeSut()
        const name = faker.name.findName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        await simulateValidSubmit(name, email, password)
        expect(addAccountSpy.params).toEqual({
            name,
            email,
            password,
            passwordConfirmation: password
        })
    })
    test('Should call AddAccount only once', async () => {
        const { addAccountSpy } = makeSut()
        await simulateValidSubmit()
        await simulateValidSubmit()
        expect(addAccountSpy.callsCount).toBe(1)
    })
    test('Should not call AddAccount if form is invalid', () => {
        const validationError = faker.random.words()
        const { addAccountSpy } = makeSut({ validationError })
        fireEvent.submit(screen.getByTestId('form'))
        expect(addAccountSpy.callsCount).toBe(0)
    })
    test('Should present error if AddAccount fails', async () => {
        const { addAccountSpy } = makeSut()
        const error = new EmailInUseError()
        jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
        await simulateValidSubmit()
        expect(screen.getByTestId('mainError')).toHaveTextContent(error.message)
        expect(screen.getByTestId('error-wrap').children).toHaveLength(1)

    })
    test('Should call UpdateCurrentAccount on success', async () => {
        const { addAccountSpy, setCurrentAccountMock } = makeSut()
        await simulateValidSubmit()
        expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    test('Should go to login page', () => {
        makeSut()
        const loginLink = screen.getByTestId('login')
        fireEvent.click(loginLink)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/login')
    })

})
