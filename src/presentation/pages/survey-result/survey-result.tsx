import { ErrorItem, Footer, Header, Loading } from "@/presentation/components"
import Styles from './survey-result-styles.scss'
import React, { useEffect, useState } from "react"
import { LoadSurveyResult } from "@/domain/usecases"
import { useErrorHandler } from "@/presentation/hooks"
import { SurveyResultData } from "@/presentation/pages/survey-result/components"
type Props = {
    loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({loadSurveyResult}:Props) =>{
    const [state, setState] = useState({
        isLoading: false,
        error: '',
        surveyResult: null as LoadSurveyResult.Model,
        reload: false
    })

    useEffect(()=>{
        loadSurveyResult.load()
        .then(surveyResult => setState(old => ({...old, surveyResult})))
        .catch(handleError)

    },[state.reload])
    const handleError = useErrorHandler(
        (error: Error) => setState(old=>({...old, surveyResult: null, error:error.message}))
    )
    const reload = (): void => setState(old=>({ isLoading: false, error: '', surveyResult: null as LoadSurveyResult.Model, reload: !old.reload}))
    return (
        <div className={Styles.surveyResultWrap}>
           <Header></Header>
                <div data-testid="survey-result" className={Styles.contentWrap}>
                    {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult}></SurveyResultData>}
                    {state.isLoading && <Loading/>} 
                    {state.error && <ErrorItem error={state.error} reload={reload}/>}
                </div>
            <Footer></Footer>
        </div>
    )
}

export default SurveyResult