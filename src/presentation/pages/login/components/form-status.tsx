import React from 'react'
import {  FormStatusBase, } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { loginState } from './atoms'





const FormStatus: React.FC = () => {
    const [state] = useRecoilState(loginState)
    return (
        <FormStatusBase 
        state ={state}
        ></FormStatusBase>
    )
}

export default FormStatus
