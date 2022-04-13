import faker from 'faker'
import { LoadSurveyList } from '../usecases/load-survey-list'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
    id: faker.random.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.random.boolean(),
    date: faker.date.recent(),

})

export const mockSurveyListModel = (numberOfObjects: number): LoadSurveyList.Model[] => {
    let listOfMockedSurveys: Array<LoadSurveyList.Model> = []
    for (let i = 0; i < numberOfObjects; i++) {
        listOfMockedSurveys.push(mockSurveyModel())
    }
    return listOfMockedSurveys
}

