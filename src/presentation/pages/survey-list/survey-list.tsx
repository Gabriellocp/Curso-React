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
                            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA0klEQVQ4EWNgIAH8//+/AYhLSNCCWynUMCD1/zcQG+BWSYQMkmEgA0Egjght2JUANYO8iQ4MsasmIAo0BZthP4DirAS0YkrjMAzk0tOYqgmIADUVgnTiADPxakfStAWmECj2DkmcWOYjoEJPRpBqmEGMQABiI4vB5IikH1PbQAYmIm0mVtlLahu4nJpe/gf0hho1XbgVGKd3qWngRFBA4/LyX6AcKZZdBbpOB2QgLk1nQJIkgElwtaBEDAXIOUULKHYSiP/CJHHQX4Hic4CYBWYgADx8PyqFiuhJAAAAAElFTkSuQmCC"></img> */}
                            <div className={[Styles.showResponse, Styles.green].join(' ')}>
                                👍
                            </div>
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