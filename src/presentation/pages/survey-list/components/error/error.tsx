import React, { useContext } from "react"
import { SurveyContext } from ".."
import Styles from './error-styles.scss'

const ErrorItem: React.FC = () => {
    const { state, setState } = useContext(SurveyContext)
    const reload: React.MouseEventHandler = (): void => {
        setState({ surveys: [], error: '', reload: !state.reload })
    }
    return (
        <div className={Styles.errorWrap}>
            <span data-testid="error">{state.error}</span>
            <button data-testid="reload" onClick={reload}>Recarregar</button>
        </div>)
}

export default ErrorItem