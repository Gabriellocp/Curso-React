import { ErrorItem, Footer, Header, Loading } from "@/presentation/components"
import Styles from './survey-result-styles.scss'
import React, { useEffect, useState } from "react"
import { LoadSurveyResult, SaveSurveyResult } from "@/domain/usecases"
import { useErrorHandler } from "@/presentation/hooks"
import { SurveyResultContext, SurveyResultData } from "@/presentation/pages/survey-result/components"
type Props = {
    loadSurveyResult: LoadSurveyResult
    saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({loadSurveyResult,saveSurveyResult}:Props) =>{
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
        (error: Error) => setState(old=>({...old, surveyResult: null, error:error.message, isLoading:false}))
    )
    const reload = (): void => setState(old=>({ isLoading: false, error: '', surveyResult: null as LoadSurveyResult.Model, reload: !old.reload}))
    const onAnswer = (answer:string): void => {
        if(state.isLoading){
            return
        }
        setState(old=>({...old, isLoading:true}))
        saveSurveyResult.save({answer})
        .then(surveyResult => setState(old => ({ ...old, isLoading: false, surveyResult })))
        .catch(handleError)
        
    }
    return (
        <div className={Styles.surveyResultWrap}>
           <Header></Header>
           <SurveyResultContext.Provider value = {{onAnswer}}>
                <div data-testid="survey-result" className={Styles.contentWrap}>
                    {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult}></SurveyResultData>}
                    {state.isLoading && <Loading/>} 
                    {state.error && <ErrorItem error={state.error} reload={reload}/>}
                </div>
            </SurveyResultContext.Provider>
            <Footer></Footer>
        </div>
    )
}

export default SurveyResult