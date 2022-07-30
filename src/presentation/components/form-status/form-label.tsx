import React from "react"
import { Spinner } from "@/presentation/components"
import Styles from "./form-status-styles.scss"
import Context from "@/presentation/contexts/form/form-context"

type Props = {
    state: any
}

const FormStatus: React.FC<Props> = ({state}: Props) => {
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
