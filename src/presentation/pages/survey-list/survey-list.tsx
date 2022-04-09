import { LoadSurveyList } from "@/domain/usecases/load-survey-list"
import { Footer, Header } from "@/presentation/components"
import React, { useEffect } from "react"
import { SurveyItemEmpty } from "./components"
import Styles from './survey-list-styles.scss'

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    useEffect(() => {
        (async function () {
            loadSurveyList.loadAll()
        })()
    }, [])
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