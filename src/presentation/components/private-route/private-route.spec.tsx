import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { Router } from 'react-router-dom'

describe('PrivateRoute', () => {
    test('Should redirect to /login if accessToken is empty ', () => {
        const history = createMemoryHistory({ initialEntries: ['/'] })
        render(
            <Router history={history}>
                <PrivateRoute></PrivateRoute>
            </Router>

        )
        expect(history.location.pathname).toBe('/login')
    })
})