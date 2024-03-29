import { fireEvent, screen } from "@testing-library/react"
import { Header } from "@/presentation/components"
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { renderWithHistory } from "@/presentation/test"


type SutTypes = {
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}
const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const {setCurrentAccountMock} = renderWithHistory({
        history,
        Page: Header,
        account
    })
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