import { render, screen } from "@testing-library/react"
import React from "react"
import {SurveyResult} from "@/presentation/pages"
import { ApiContext } from "@/presentation/contexts"
import { mockAccountModel } from "@/domain/test"

describe('SurveyResult Component', ()=> {
    test('Should present correct initial state', ()=>{
        render(
            <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
                <SurveyResult></SurveyResult>
            </ApiContext.Provider>
            )
        const surveyResult = screen.getByTestId('survey-result')
        expect(surveyResult.childElementCount).toBe(0)
        expect(screen.queryByTestId('error')).not.toBeInTheDocument()
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
})