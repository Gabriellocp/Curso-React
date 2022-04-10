import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { makeApiUrl } from "../../http/api-url-factory";
import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";

export const makeRemoteSurveyList = (): LoadSurveyList => {
    return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
}