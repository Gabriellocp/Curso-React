import { fireEvent, screen } from "@testing-library/react"
import { mockSurveyModel } from "@/domain/test"
import { SurveyItem } from "@/presentation/pages/survey-list/components"
import { IconName } from "@/presentation/components/response-icon/response-icon"
import {createMemoryHistory, MemoryHistory} from 'history'
import { renderWithHistory } from "@/presentation/test"

type SutTypes = {
    history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
    const history = createMemoryHistory({initialEntries: ['/']})
   
        renderWithHistory({
            history,
            Page: ()=> SurveyItem({
                survey:survey
            }),
            
        })
    
  
    return {
        history
    }
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
    test('Should go to SurveyResult', () => {
        const survey = mockSurveyModel()
        const {history}= makeSut(survey)
        fireEvent.click(screen.getByTestId('link'))
        expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
    })

})