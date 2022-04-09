import { Footer, Header } from "@/presentation/components"
import React from "react"
import { SurveyItemEmpty } from "./components"
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyList} >
            <Header></Header>
            <div className={Styles.mainContent}>
                <h2> Enquetes </h2>
                <ul data-testid="surveyList">
                    <SurveyItemEmpty></SurveyItemEmpty>
                </ul>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default SurveyList