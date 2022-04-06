import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { Router } from 'react-router-dom'

type SutTypes = {
    history: MemoryHistory
}
const makeSut = (): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })

    render(
        <Router history={history}>
            <PrivateRoute></PrivateRoute>
        </Router>

    )
    return {
        history
    }
}

describe('PrivateRoute', () => {
    test('Should redirect to /login if accessToken is empty ', () => {
        const { history } = makeSut()
        expect(history.location.pathname).toBe('/login')
    })
})