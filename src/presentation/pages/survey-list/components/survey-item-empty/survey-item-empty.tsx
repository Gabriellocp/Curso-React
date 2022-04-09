import React from "react"
import Styles from "./survey-item-empty-styles.scss"

const SurveyItem: React.FC = () => {
    return (
        <>
            <li className={Styles.stylesItemEmpty}></li>
            <li className={Styles.stylesItemEmpty}></li>
            <li className={Styles.stylesItemEmpty}></li>
            <li className={Styles.stylesItemEmpty}></li>
        </>
    )
}

export default SurveyItem