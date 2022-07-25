import { Footer, Header, Spinner } from "@/presentation/components"
import Styles from './survey-result-styles.scss'
import FlipMove from "react-flip-move"
import React from "react"
const SurveyResult: React.FC = () =>{
    return (
        <div className={Styles.surveyResultWrap}>
           <Header></Header>
                <div className={Styles.contentWrap}>
                    <h2> Pergunta Teste </h2>
                        <FlipMove className={Styles.answersList}>
                            <li>
                                <img src=""></img>
                                <span className={Styles.answer}>Respotas</span>
                                <span className={Styles.percent}>50%</span>
                            </li>
                            <li className={Styles.active}>
                                <img src=""></img>
                                <span className={Styles.answer}>Respotas</span>
                                <span className={Styles.percent}>50%</span>
                            </li>
                            <li>
                                <img src=""></img>
                                <span className={Styles.answer}>Respotas</span>
                                <span className={Styles.percent}>50%</span>
                            </li>
                        </FlipMove>
                    <button>Voltar</button>
                    <div className={Styles.loadingWrap}>
                        <div className={Styles.loading}>
                            <span>Aguarde...</span>
                            <Spinner isNegative></Spinner>
                        </div>
                    </div>

                </div>
            <Footer></Footer>
        </div>
    )
}

export default SurveyResult