import { LoadSurveyList } from "@/domain/usecases/load-survey-list"
import { Calendar, ResponseIcon } from "@/presentation/components"
import { IconName } from "@/presentation/components/response-icon/response-icon"
import React from "react"
import { Link } from "react-router-dom"
import Styles from "./survey-item-styles.scss"

type Props = {
    survey: LoadSurveyList.Model
}
const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
    const iconName = survey.didAnswer ? IconName.hasResponse : IconName.noResponse
    return (
        <li className={Styles.surveyItemWrap}>
            <div className={Styles.surveyContent}>
                <ResponseIcon iconName={iconName}></ResponseIcon>
                <Calendar date={survey.date} className={Styles.calendarWrap}/>
                <p data-testid="question">{survey.question}</p>
            </div>
            <footer><Link data-testid='link' to={`/surveys/${survey.id}`}> Ver resultado </Link></footer>
        </li>
    )
}

export default SurveyItem