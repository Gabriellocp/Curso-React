import { Calendar, ErrorItem, Footer, Header, Loading } from "@/presentation/components"
import Styles from './survey-result-styles.scss'
import FlipMove from "react-flip-move"
import React, { useState } from "react"
import { LoadSurveyResult } from "@/domain/usecases"
const SurveyResult: React.FC = () =>{
    const [state] = useState({
        isLoading: false,
        error: '',
        surveyResult: null as LoadSurveyResult.Model
    })
    return (
        <div className={Styles.surveyResultWrap}>
           <Header></Header>
                <div data-testid="survey-result" className={Styles.contentWrap}>
                    {state.surveyResult && 
                    <>
                    <hgroup>
                        <Calendar date={new Date()} className={Styles.calendarWrap}/>
                        <h2> Pergunta Teste </h2>
                    </hgroup>
                        <FlipMove className={Styles.answersList}>
                            <li>
                                <img src=""></img>
                                <span className={Styles.answer}>Respotas</span>
                                <span className={Styles.percent}>50%</span>
                            </li>
                            <li className={Styles.active}>
                                <img src=""></img>
                                <span className={Styles.answer}>Respotas</span>
                                <span className={Styles.percent}>50%</span>
                            </li>
                            <li>
                                <img src=""></img>
                                <span className={Styles.answer}>Respotas</span>
                                <span className={Styles.percent}>50%</span>
                            </li>
                        </FlipMove>
                    <button>Voltar</button>
                    </>
                    }
                    {state.isLoading && <Loading/>} 
                    {state.error && <ErrorItem error={state.error} reload={()=>{}}/>}
                </div>
            <Footer></Footer>
        </div>
    )
}

export default SurveyResult