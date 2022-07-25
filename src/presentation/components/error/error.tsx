import React, { useContext } from "react"
import { SurveyContext } from "../../pages/survey-list/components"
import Styles from './error-styles.scss'

type Props = {
    error: string
    reload: () => void
}

const ErrorItem: React.FC<Props> = ({error, reload}:Props) => {

    return (
        <div className={Styles.errorWrap}>
            <span data-testid="error">{error}</span>
            <button data-testid="reload" onClick={reload}>Recarregar</button>
        </div>)
}

export default ErrorItem