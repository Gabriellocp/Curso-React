import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
    history: MemoryHistory
}
const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })

    render(
        <ApiContext.Provider value={{
            getCurrentAccount: () => account
        }}>
            <Router history={history}>
                <PrivateRoute></PrivateRoute>
            </Router>
        </ApiContext.Provider>
    )
    return {
        history
    }
}

describe('PrivateRoute', () => {
    test('Should redirect to /login if accessToken is empty ', () => {
        const { history } = makeSut(null)
        expect(history.location.pathname).toBe('/login')
    })
    test('Should render current component if accessToken exists ', () => {
        const { history } = makeSut()
        expect(history.location.pathname).toBe('/')
    })
})