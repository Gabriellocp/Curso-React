import { ResponseIcon } from "@/presentation/components"
import { IconName } from "@/presentation/components/response-icon/response-icon"
import React from "react"
import Styles from "./survey-item-styles.scss"

const SurveyItem: React.FC = () => {
    return (
        <li className={Styles.surveyItemWrap}>
            <div className={Styles.surveyContent}>
                <ResponseIcon iconName={IconName.hasResponse}></ResponseIcon>
                <time>
                    <span className={Styles.day}>12</span>
                    <span className={Styles.month}>12</span>
                    <hr></hr>
                    <span className={Styles.year}>1202</span>
                </time>
                <p>Texto qualquer</p>
            </div>
            <footer> Ver resultado </footer>
        </li>
    )
}

export default SurveyItem