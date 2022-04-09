import { render, screen } from "@testing-library/react"
import React from "react"
import { mockSurveyModel } from "@/domain/test"
import { SurveyItem } from "@/presentation/pages/survey-list/components"
import { IconName } from "@/presentation/components/response-icon/response-icon"
const surveyElements: number = 3
describe('SurveyItem component', () => {
    test('Should show correct information on render', () => {
        const survey = mockSurveyModel()
        survey.didAnswer = true
        survey.date = new Date('2020-01-10T00:00:00')
        render(<SurveyItem survey={survey}></SurveyItem>)
        expect(screen.getByTestId('icon')).toHaveTextContent(IconName.hasResponse)
        expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
        expect(screen.getByTestId('day')).toHaveTextContent('10')
        expect(screen.getByTestId('month')).toHaveTextContent('jan')
        expect(screen.getByTestId('year')).toHaveTextContent('2020')
    })

})