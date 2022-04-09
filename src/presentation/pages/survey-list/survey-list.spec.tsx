import React from "react"
import { render, screen } from "@testing-library/react"
import SurveyList from "./survey-list"

describe('SurveyList component', () => {
    test('Should present 4 empty li\'s on load page', () => {
        render(<SurveyList></SurveyList>)
        const surveyList = screen.getByTestId('surveyList')
        expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    })
})