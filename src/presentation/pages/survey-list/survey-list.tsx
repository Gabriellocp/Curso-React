import { SurveyModel } from "@/domain/models"
import { LoadSurveyList } from "@/domain/usecases/load-survey-list"
import { Footer, Header } from "@/presentation/components"
import React, { useEffect, useState } from "react"
import { ErrorItem, ListItem, SurveyContext } from "./components"
import Styles from './survey-list-styles.scss'

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    const [state, setState] = useState({
        surveys: [] as SurveyModel[],
        error: '',
        reload: false
    })
    useEffect(() => {

        loadSurveyList.loadAll()
            .then(surveys => setState({ ...state, surveys }))
            .catch(error => setState({ ...state, error: error.message }))

    }, [state.reload])
    return (
        <div className={Styles.surveyList} >
            <Header></Header>
            <SurveyContext.Provider value={{ state, setState }}>
                <div className={Styles.mainContent}>
                    <h2> Enquetes </h2>

                    {
                        !state.error ?
                            <ErrorItem></ErrorItem>
                            :
                            <ListItem></ListItem>

                    }

                </div>
            </SurveyContext.Provider>
            <Footer></Footer>
        </div>
    )
}

export default SurveyList