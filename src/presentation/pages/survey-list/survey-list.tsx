import { LoadSurveyList } from "@/domain/usecases/load-survey-list"
import { ErrorItem, Footer, Header } from "@/presentation/components"
import { useErrorHandler } from "@/presentation/hooks"
import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import {ListItem, surveyListState } from "./components"
import Styles from './survey-list-styles.scss'

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    const handleError = useErrorHandler((error: Error) => setState({ ...state, error: error.message }))
    const [state, setState] = useRecoilState(surveyListState)
    const reload = (): void => {
        setState(old => ({surveys: [],error: '',reload: !old.reload}))
    }
    useEffect(() => {

        loadSurveyList.loadAll()
            .then(surveys => setState(old=>({ ...old, surveys })))
            .catch(handleError)

    }, [state.reload])
    return (
        <div className={Styles.surveyList} >
            <Header></Header>
                <div className={Styles.mainContent}>
                    <h2> Enquetes </h2>

                    {
                        state.error ?
                            <ErrorItem
                            error={state.error}
                            reload={reload}
                            ></ErrorItem>
                            :
                            <ListItem surveys={state.surveys}></ListItem>

                    }

                </div>
            <Footer></Footer>
        </div>
    )
}

export default SurveyList