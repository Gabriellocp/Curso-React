import { Calendar, Footer, Header, Loading } from "@/presentation/components"
import Styles from './survey-result-styles.scss'
import FlipMove from "react-flip-move"
import React from "react"
const SurveyResult: React.FC = () =>{
    return (
        <div className={Styles.surveyResultWrap}>
           <Header></Header>
                <div className={Styles.contentWrap}>
                    {false && 
                    <>
                    <hgroup>
                        <Calendar date={new Date()} className={Styles.calendarWrap}/>
                        <h2> Pergunta Teste </h2>
                    </hgroup>
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
                    </>
                    }
                    {/* <Loading/> */}
                </div>
            <Footer></Footer>
        </div>
    )
}

export default SurveyResult