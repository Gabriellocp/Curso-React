import React from "react"
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import SurveyList from "./survey-list"
import { LoadSurveyListSpy, mockAccountModel } from "@/domain/test"
import { AccessDeniedError, UnexpectedError } from "@/domain/errors"
import { ApiContext } from "@/presentation/contexts"
import { Router } from "react-router-dom"
import { AccountModel } from "@/domain/models"
import { RecoilRoot } from "recoil"

const surveyElements: number = 2

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}


const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy(surveyElements)): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()
    render(
        <RecoilRoot>
            <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
                <Router history={history}>
                    <SurveyList loadSurveyList={loadSurveyListSpy}></SurveyList>
                </Router>
            </ApiContext.Provider>
        </RecoilRoot>
    )
    return {
        loadSurveyListSpy,
        history,
        setCurrentAccountMock
    }
}
describe('SurveyList component', () => {
    test('Should present 4 empty li\'s on load page', async () => {
        makeSut()
        const surveyList = screen.getByTestId('surveyList')
        expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
        expect(screen.queryByTestId('error')).not.toBeInTheDocument()

        await waitFor(() => surveyList)
    })
    test('Should call LoadSurveyList', async () => {
        const { loadSurveyListSpy } = makeSut()
        expect(loadSurveyListSpy.callsCount).toBe(1)
        await waitFor(() => screen)
    })
    test('Should render SurveyItem on success', async () => {
        makeSut()
        const surveyList = screen.getByTestId('surveyList')
        await waitFor(() => surveyList)
        expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(surveyElements)
    })
    test('Should render error on UnexpectedError', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        const error = new UnexpectedError()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
        makeSut(loadSurveyListSpy)
        await waitFor(() => screen.getByRole('heading'))
        expect(screen.queryByTestId('surveyList')).not.toBeInTheDocument()
        expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    })
    test('Should logout on AccessDeniedError', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
        const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy)
        await waitFor(() => screen.getByRole('heading'))
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
        expect(history.location.pathname).toBe('/login')

    })
    test('Should call LoadSurveyList on reload', async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy()
        // Line below does NOT execute 'loadAll()' method on Spy
        // so callsCount won't be incremented as it should
        jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
        makeSut(loadSurveyListSpy)
        await waitFor(() => screen.getByRole('heading'))
        fireEvent.click(screen.getByTestId('reload'))
        expect(loadSurveyListSpy.callsCount).toBe(1)
        await waitFor(() => screen.getByRole('heading'))

    })
})