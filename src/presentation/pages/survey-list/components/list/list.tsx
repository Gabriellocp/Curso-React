import { SurveyModel } from "@/domain/models"
import { SurveyItem, SurveyItemEmpty, SurveyContext } from "@/presentation/pages/survey-list/components"
import Styles from './list-styles.scss'
import React, { useContext } from "react"


const List: React.FC = () => {
    const { state } = useContext(SurveyContext)
    return (
        <ul className={Styles.listWrap} data-testid="surveyList">
            {state.surveys.length ?
                state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey}></SurveyItem>) :
                <SurveyItemEmpty></SurveyItemEmpty>
            }
        </ul>
    )
}

export default List