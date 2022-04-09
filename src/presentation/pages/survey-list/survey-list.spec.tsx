import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import SurveyList from "./survey-list"
import { LoadSurveyList } from "@/domain/usecases/load-survey-list"
import { SurveyModel } from "@/domain/models"
import { mockSurveyListModel } from "@/domain/test"

const surveyElements: number = 2

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
}

class LoadSurveyListSpy implements LoadSurveyList {
    callsCount: number = 0
    surveys: SurveyModel[] = mockSurveyListModel(surveyElements)
    async loadAll(): Promise<SurveyModel[]> {
        this.callsCount++
        return this.surveys
    }
}

const makeSut = (): SutTypes => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    render(<SurveyList loadSurveyList={loadSurveyListSpy}></SurveyList>)
    return {
        loadSurveyListSpy
    }
}
describe('SurveyList component', () => {
    test('Should present 4 empty li\'s on load page', async () => {
        makeSut()
        const surveyList = screen.getByTestId('surveyList')
        expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
        await waitFor(() => surveyList)
    })
    test('Should call LoadSurveyList', async () => {
        const { loadSurveyListSpy } = makeSut()
        expect(loadSurveyListSpy.callsCount).toBe(1)
        await waitFor(() => screen)
    })
    test('Should ', async () => {
        makeSut()
        const surveyList = screen.getByTestId('surveyList')
        await waitFor(() => surveyList)
        expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(surveyElements)
    })
})