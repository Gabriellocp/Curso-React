import faker from 'faker'
import { SurveyModel } from "@/domain/models"

export const mockSurveyListModel = (): SurveyModel[] => ([{
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
    date: faker.date.recent()
}])
