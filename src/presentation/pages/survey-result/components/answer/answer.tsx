import { SurveyResultAnswerModel } from "@/domain/models"
import React from "react"
import Styles from './answer-styles.scss'
import { useRecoilValue } from "recoil"
import { onSurveyAnswerState } from "@/presentation/pages/survey-result/components"

type Props = {
    answer: SurveyResultAnswerModel
}

const Answer : React.FC<Props> = ({answer}: Props) => {
    // const {onAnswer} = useContext(SurveyResultContext)
    const {onAnswer} = useRecoilValue(onSurveyAnswerState )
    const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''
    const answerClick = (event: React.MouseEvent):void =>{
        if(event.currentTarget.classList.contains(Styles.active)){
            return
        }
        onAnswer(answer.answer)
    }
    return (
        <li 
            onClick={answerClick}
            data-testid="answer-wrap" 
            key={answer.answer} className={[Styles.answerWrap, activeClassName].join(' ')
        }>
            {answer.image && <img data-testid='image' alt={answer.answer} src={answer.image}></img>}
            <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
            <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
        </li>
    )
}

export default Answer