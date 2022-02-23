import { RenderResult } from "@testing-library/react"

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
