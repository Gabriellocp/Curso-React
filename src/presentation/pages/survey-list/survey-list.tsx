import { Footer, Header, ResponseIcon } from "@/presentation/components"
import { IconName } from "@/presentation/components/response-icon/response-icon"
import React from "react"
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyList}>
            <Header></Header>
            <div className={Styles.mainContent}>
                <h2> Enquetes </h2>
                <ul>
                    <li>
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
                    <li></li>
                </ul>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default SurveyList