import { SurveyResultAnswerModel } from "@/domain/models"
import React from "react"
import Styles from './answer-styles.scss'

type Props = {
    answer: SurveyResultAnswerModel
}

const Answer : React.FC<Props> = ({answer}: Props) => {
    const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''
    return (
        <li data-testid="answer-wrap" key={answer.answer} className={[Styles.answerWrap, activeClassName].join(' ')}>
            {answer.image && <img data-testid='image' alt={answer.answer} src={answer.image}></img>}
            <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
            <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
        </li>
    )
}

export default Answer