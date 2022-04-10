import React, { useContext } from "react"
import { SurveyContext } from ".."

const ErrorItem: React.FC = () => {
    const { state, setState } = useContext(SurveyContext)
    const reload: React.MouseEventHandler = (): void => {
        setState({ surveys: [], error: '', reload: !state.reload })
    }
    return (
        <div>
            <span data-testid="error">{state.error}</span>
            <button data-testid="reload" onClick={reload}>Recarregar</button>
        </div>)
}

export default ErrorItem