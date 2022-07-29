import React from 'react'
import {  SubmitButtonBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { loginState } from './atoms'



type Props = {
    text: string
}

const SubmitButton: React.FC<Props> = ({text}:Props) => {
    const [state] = useRecoilState(loginState)
    return (
        <SubmitButtonBase 
        text={text} 
        state ={state}
        ></SubmitButtonBase>
    )
}

export default SubmitButton
