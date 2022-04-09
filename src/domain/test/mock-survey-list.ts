import faker from 'faker'
import { SurveyModel } from "@/domain/models"

export const mockSurveyModel = (): SurveyModel => ({
    id: faker.random.uuid(),
    question: faker.random.words(10),
    answers: [{
        answer: faker.random.words(4),
        image: faker.internet.url()
    },
    {
        answer: faker.random.words(5),
    }],
    didAnswer: faker.random.boolean(),
    date: faker.date.recent(),

})

export const mockSurveyListModel = (numberOfObjects: number): SurveyModel[] => {
    let listOfMockedSurveys: Array<SurveyModel> = []
    for (let i = 0; i < numberOfObjects; i++) {
        listOfMockedSurveys.push(mockSurveyModel())
    }
    return listOfMockedSurveys
}

