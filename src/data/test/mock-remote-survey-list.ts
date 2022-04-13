import { RemoteLoadSurveyList } from "../usecases/load-survey-list/remote-load-survey-list";
import faker from 'faker'
export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
    id: faker.random.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.random.boolean(),
    date: faker.date.recent().toISOString()
})

export const mockRemoteSurveyListModel = (numberOfObjects: number): RemoteLoadSurveyList.Model[] => {
    let listOfMockedSurveys: Array<RemoteLoadSurveyList.Model> = []
    for (let i = 0; i < numberOfObjects; i++) {
        listOfMockedSurveys.push(mockRemoteSurveyModel())
    }
    return listOfMockedSurveys
}
