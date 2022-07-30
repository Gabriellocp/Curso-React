import { render } from '@testing-library/react'
import {MemoryHistory} from 'history'
import { Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'
import { currentAccountState } from '@/presentation/components'
import React from 'react'

type Params = {
    history: MemoryHistory
    Page: React.FC
    account?: AccountModel
}

type Result = {
    setCurrentAccountMock: (account: AccountModel)=> void
}

export const renderWithHistory = ({Page, history, account = mockAccountModel()}: Params): Result => {
    const setCurrentAccountMock = jest.fn()
    const mockedState = {
        setCurrentAccount: setCurrentAccountMock, 
        getCurrentAccount: ()=> account
    }

    render(
        <RecoilRoot initializeState={({set})=> set(currentAccountState,mockedState)}>
            <Router history={history}>
                <Page/>
            </Router>
        </RecoilRoot>
        )
    return {
        setCurrentAccountMock
    }
}