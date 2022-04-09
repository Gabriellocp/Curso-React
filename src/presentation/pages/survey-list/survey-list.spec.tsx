import React from "react"
import { render, screen } from "@testing-library/react"
import SurveyList from "./survey-list"


type SutTypes = {

}

const makeSut = (): void => {
    render(<SurveyList></SurveyList>)
}
describe('SurveyList component', () => {
    test('Should present 4 empty li\'s on load page', () => {
        makeSut()
        const surveyList = screen.getByTestId('surveyList')
        expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    })
})