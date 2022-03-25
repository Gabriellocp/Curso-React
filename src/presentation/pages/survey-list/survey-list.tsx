import { Footer, Logo } from "@/presentation/components"
import React from "react"
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyList}>
            <header className={Styles.header}>
                <div className={Styles.headerContent}>
                    <Logo></Logo>
                    <div className={Styles.userInfo}>
                        <span> Gabriel </span>
                        <a href="#"> Sair </a>
                    </div>
                </div>
            </header>
            <div className={Styles.mainContent}>
                <h2> Enquetes </h2>
                <ul>
                    <li>
                        <div className={Styles.surveyContent}>
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
                </ul>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default SurveyList