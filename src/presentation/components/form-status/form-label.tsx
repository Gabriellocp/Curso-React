import React, { useContext } from "react"
import { Spinner } from "@/presentation/components"
import Styles from "./form-status-styles.scss"
import Context from "@/presentation/contexts/form/form-context"
const FormStatus: React.FC = () => {
    const { state } = useContext(Context)
    const { mainError } = state
    return (
        <div data-testid='error-wrap' className={Styles.errorWrap}>
            {state.isLoading && <Spinner className={Styles.spinner} />}
            {mainError && <span data-testid='mainError' className={Styles.error}>
                {mainError}
            </span>}
        </div>
    )
}

export default FormStatus
