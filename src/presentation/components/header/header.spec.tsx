import React from "react"
import { Router } from "react-router-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { Header,  currentAccountState } from "@/presentation/components"
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { RecoilRoot } from "recoil"


type SutTypes = {
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}
const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    const mockedState = {setCurrentAccount: setCurrentAccountMock, getCurrentAccount: ()=>account}
    render(
        <RecoilRoot initializeState={({set})=> set(currentAccountState, mockedState)}>
                <Router history={history}>
                    <Header></Header>
                </Router>
        </RecoilRoot>
    )
    return {
        history,
        setCurrentAccountMock
    }
}

describe('HeaderComponent', () => {
    test('Should call setCurrentAccount with null value', () => {
        const { history, setCurrentAccountMock } = makeSut()
        fireEvent.click(screen.getByTestId('logout'))
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
        expect(history.location.pathname).toBe('/login')
    })
    test('Should render username correctly', () => {
        const account = mockAccountModel()
        makeSut(account)
        expect(screen.getByTestId('username')).toHaveTextContent(account.name)
    })
})