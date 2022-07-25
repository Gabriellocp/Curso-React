import {Spinner} from "@/presentation/components"
import Styles from "./loading-styles.scss"
import React from "react"

const Loading: React.FC = () => {
    return (
        <div className={Styles.loadingWrap}>
        <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative></Spinner>
        </div>
    </div>
    )
}

export default Loading