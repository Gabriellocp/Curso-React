import React from "react"
import Styles from "../input/input-styles.scss"

type Props = {
    text: string
    state: any
}

const SubmitButton: React.FC<Props> = ({ text , state }: Props) => {
    return (
        <button data-testid="submit" disabled={state.isFormInvalid} className={Styles.submit} type="submit">{text}</button>
    )
}

export default SubmitButton
