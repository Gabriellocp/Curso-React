import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { mockAccountModel } from '@/domain/test'
import { renderWithHistory } from '@/presentation/test'

type SutTypes = {
    history: MemoryHistory
}
const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const mockedState = {setCurrentAccount: jest.fn(), getCurrentAccount: ()=>account}
    renderWithHistory({
        history,
        Page: PrivateRoute,
        account
    })
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