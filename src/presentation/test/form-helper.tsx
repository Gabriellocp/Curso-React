import { fireEvent, RenderResult } from "@testing-library/react"
import faker from 'faker'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
    const el = sut.getByTestId(fieldName)
    expect(el.childElementCount).toBe(count)
}
export const testButtonIsDisabled = (sut: RenderResult, name: string, isDisabled: boolean): void => {
    const el = sut.getByTestId(name) as HTMLButtonElement
    expect(el.disabled).toBe(isDisabled)
}

export const testStatusForFields = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const statusField = sut.getByTestId(`${fieldName}Status`)
    expect(statusField.title).toBe(validationError || 'Tudo certo')
    expect(statusField.textContent).toBe(validationError ? '😭' : '😎')
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.words()): void => {
    const input = sut.getByTestId(fieldName)
    fireEvent.input(input, { target: { value } })

}

export const testElementExists = (sut: RenderResult, name: string): void => {
    const el = sut.getByTestId(name)
    expect(el).toBeTruthy()
}

export const testElementText = (sut: RenderResult, name: string, text: string): void => {
    const el = sut.getByTestId(name)
    expect(el.textContent).toBe(text)
}
