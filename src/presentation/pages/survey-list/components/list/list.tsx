import { SurveyItem, SurveyItemEmpty } from "@/presentation/pages/survey-list/components"
import Styles from './list-styles.scss'
import React from "react"
import { LoadSurveyList } from "@/domain/usecases/load-survey-list"

type Props = {
    surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({surveys}:Props) => {
    return (
        <ul className={Styles.listWrap} data-testid="surveyList">
            {surveys.length ?
                surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey}></SurveyItem>) :
                <SurveyItemEmpty></SurveyItemEmpty>
            }
        </ul>
    )
}

export default List