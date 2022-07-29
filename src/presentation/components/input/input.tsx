import React, { useRef } from "react"
import Styles from "./input-styles.scss"
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    state: any
    setState: any
}
const Input: React.FC<Props> = ({state, setState, ...props}: Props) => {
    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false
    }
    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState(old => ({
            ...old,
            [event.target.name]: event.target.value
        }) 

            
        )
    }
    const error = state[`${props.name}Error`]
    // const getStatus = (): string => {
    //     return error ? '😭' : '😎'
    // }
    // const getTitle = (): string => {
    //     return error || 'Tudo certo'
    // }
    const inputRef = useRef<HTMLInputElement>()
    return (
        <div
            data-testid={`${props.name}-wrap`}
            className={Styles.inputWrap}
            data-status={error ? 'invalid' : 'valid'}
        >
            <input {...props}
                ref={inputRef}
                title={error}
                placeholder=" "
                data-testid={props.name}
                readOnly onFocus={enableInput}
                onChange={handleChange}
            ></input>
            <label
                data-testid={`${props.name}-label`}
                title={error}
                onClick={(_) => { inputRef.current.focus() }}
            >{props.placeholder}
            </label>
            {/* <span
                data-testid={`${props.name}Status`}
                title={getTitle()}
                className={Styles.status}
            >
                {getStatus()}
            </span> */}
        </div>
    )
}

export default Input
