import React from "react"
import { render, screen } from "@testing-library/react"
import SurveyList from "./survey-list"
import { LoadSurveyList } from "@/domain/usecases/load-survey-list"
import { SurveyModel } from "@/domain/models"


type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
}

class LoadSurveyListSpy implements LoadSurveyList {
    callsCount: number = 0
    async loadAll(): Promise<SurveyModel[]> {
        this.callsCount++
        return []
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
    test('Should present 4 empty li\'s on load page', () => {
        makeSut()
        const surveyList = screen.getByTestId('surveyList')
        expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    })
    test('Should call LoadSurveyList', () => {
        const { loadSurveyListSpy } = makeSut()
        expect(loadSurveyListSpy.callsCount).toBe(1)

    })
})