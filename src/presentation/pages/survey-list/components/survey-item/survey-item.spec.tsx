import { render, screen } from "@testing-library/react"
import React from "react"
import { mockSurveyModel } from "@/domain/test"
import { SurveyItem } from "@/presentation/pages/survey-list/components"
import { IconName } from "@/presentation/components/response-icon/response-icon"

const makeSut = (survey = mockSurveyModel()): void => {
    render(<SurveyItem survey={survey}></SurveyItem>)
}

describe('SurveyItem component', () => {
    test('Should show correct information on render', () => {
        const survey = Object.assign(mockSurveyModel(), {
            didAnswer: true,
            date: new Date('2020-01-10T00:00:00')
        })
        makeSut(survey)
        expect(screen.getByTestId('icon')).toHaveTextContent(IconName.hasResponse)
        expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
        expect(screen.getByTestId('day')).toHaveTextContent('10')
        expect(screen.getByTestId('month')).toHaveTextContent('jan')
        expect(screen.getByTestId('year')).toHaveTextContent('2020')
    })
    test('Should show correct information on render', () => {
        const survey = Object.assign(mockSurveyModel(), {
            didAnswer: false,
            date: new Date('2019-05-03T00:00:00')
        })
        makeSut(survey)
        expect(screen.getByTestId('icon')).toHaveTextContent(IconName.noResponse)
        expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
        expect(screen.getByTestId('day')).toHaveTextContent('03')
        expect(screen.getByTestId('month')).toHaveTextContent('mai')
        expect(screen.getByTestId('year')).toHaveTextContent('2019')
    })

})