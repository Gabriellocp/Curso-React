import React from "react"
import Styles from "./survey-item-empty-styles.scss"

const SurveyItem: React.FC = () => {
    return (
        <>
            <li className={Styles.surveyItemEmpty}></li>
            <li className={Styles.surveyItemEmpty}></li>
            <li className={Styles.surveyItemEmpty}></li>
            <li className={Styles.surveyItemEmpty}></li>

        </>
    )
}

export default SurveyItem