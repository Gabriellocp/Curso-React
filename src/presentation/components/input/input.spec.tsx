import React from "react"
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Input from './input'
import faker from 'faker'

const makeSut = (fieldName = faker.database.column()): RenderResult => {
    return render(
            <Input name={fieldName} state={{}} setState={null}></Input>
    )
}

describe('Input Component', () => {
    test('Should begin with read only', () => {
        const field = faker.database.column()
        const sut = makeSut(field)
        const input = sut.getByTestId(field) as HTMLInputElement
        expect(input.readOnly).toBe(true)
    })

    test('Should remove readOnly on focus', () => {
        const field = faker.database.column()
        const sut = makeSut(field)
        const input = sut.getByTestId(field) as HTMLInputElement
        fireEvent.focus(input)
        expect(input.readOnly).toBe(false)
    })
    test('Should focus input on click', () => {
        const field = faker.database.column()
        const sut = makeSut(field)
        const input = sut.getByTestId(field)
        const label = sut.getByTestId(`${field}-label`)
        fireEvent.click(label)
        expect(document.activeElement).toBe(input)
    })
})
