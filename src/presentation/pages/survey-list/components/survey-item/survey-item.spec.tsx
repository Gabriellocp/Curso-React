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
        })
        makeSut(survey)
        expect(screen.getByTestId('icon')).toHaveTextContent(IconName.hasResponse)
        expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
       
    })
    test('Should show correct information on render', () => {
        const survey = Object.assign(mockSurveyModel(), {
            didAnswer: false,
        })
        makeSut(survey)
        expect(screen.getByTestId('icon')).toHaveTextContent(IconName.noResponse)
        expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
       
    })

})