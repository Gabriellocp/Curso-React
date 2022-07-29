import React from 'react'
import {  SubmitButtonBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { signupState } from './atoms'



type Props = {
    text: string
}

const SubmitButton: React.FC<Props> = ({text}:Props) => {
    const [state] = useRecoilState(signupState)
    return (
        <SubmitButtonBase 
        text={text} 
        state ={state}
        ></SubmitButtonBase>
    )
}

export default SubmitButton
