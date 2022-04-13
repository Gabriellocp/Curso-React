import { LoadSurveyList } from "@/domain/usecases/load-survey-list"
import { ResponseIcon } from "@/presentation/components"
import { IconName } from "@/presentation/components/response-icon/response-icon"
import React from "react"
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
                <time>
                    <span data-testid="day" className={Styles.day}>
                        {survey.date.getDate().toString().padStart(2, '0')}
                    </span>
                    <span data-testid="month" className={Styles.month}>
                        {survey.date.toLocaleString('pr-BR', { month: 'short' }).replace('.', '')}
                    </span>
                    <hr></hr>
                    <span data-testid="year" className={Styles.year}>
                        {survey.date.getFullYear()}
                    </span>
                </time>
                <p data-testid="question">{survey.question}</p>
            </div>
            <footer> Ver resultado </footer>
        </li>
    )
}

export default SurveyItem