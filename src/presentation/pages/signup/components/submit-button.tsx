import React from 'react'
import {  SubmitButtonBase } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import { signupState } from './atoms'



type Props = {
    text: string
}

const SubmitButton: React.FC<Props> = ({text}:Props) => {
    const state = useRecoilValue(signupState)
    return (
        <SubmitButtonBase 
        text={text} 
        state ={state}
        ></SubmitButtonBase>
    )
}

export default SubmitButton
