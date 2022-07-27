import { Calendar } from "@/presentation/components"
import { LoadSurveyResult } from "@/domain/usecases"
import { useHistory } from "react-router-dom"
import FlipMove from "react-flip-move"
import React from "react"
import Styles from './result-styles.scss'
import { SurveyResultAnswer } from "@/presentation/pages/survey-result/components"

type Props = {
    surveyResult: LoadSurveyResult.Model
}

const Result : React.FC<Props> = ({surveyResult}: Props) => {
    const {goBack} = useHistory()
    return (
        <>
        <hgroup>
            <Calendar date={surveyResult.date} className={Styles.calendarWrap}/>
            <h2 data-testid='question'> {surveyResult.question} </h2>
        </hgroup>
        <FlipMove data-testid='answers' className={Styles.answersList}>
            <>
            {
                surveyResult.answers.map(answer=> <SurveyResultAnswer key={answer.answer} answer={answer}></SurveyResultAnswer> )
            }
            </>  
            
        </FlipMove>
        <button data-testid="backbutton" onClick={goBack} className={Styles.button} >Voltar</button>
    </>
    )
}

export default Result