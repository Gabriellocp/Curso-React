import React, { useContext } from "react"
import Styles from "./input-styles.scss"
import Context from '@/presentation/contexts/form/form-context'
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
const Input: React.FC<Props> = (props: Props) => {
    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false
    }
    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }
    const { state, setState } = useContext(Context)
    const error = state[`${props.name}Error`]
    const getStatus = (): string => {
        return error ? '😭' : '😎'
    }
    const getTitle = (): string => {
        return error || 'Tudo certo'
    }
    return (
        <div className={Styles.inputWrap}>
            <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange}></input>
            <span data-testid={`${props.name}Status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
        </div>
    )
}

export default Input
