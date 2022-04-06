import { fireEvent, screen } from "@testing-library/react"
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
    const el = screen.getByTestId(fieldName)
    expect(el.childElementCount).toBe(count)
}
export const testButtonIsDisabled = (name: string, isDisabled: boolean): void => {
    const el = screen.getByTestId(name) as HTMLButtonElement
    expect(el.disabled).toBe(isDisabled)
}

export const testStatusForFields = (fieldName: string, validationError?: string): void => {
    const wrap = screen.getByTestId(`${fieldName}-wrap`)
    const field = screen.getByTestId(`${fieldName}`)
    const label = screen.getByTestId(`${fieldName}-label`)
    expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
    expect(field.title).toBe(validationError || '')
    expect(label.title).toBe(validationError || '')

}

export const populateField = (fieldName: string, value = faker.random.words()): void => {
    const input = screen.getByTestId(fieldName)
    fireEvent.input(input, { target: { value } })

}

export const testElementExists = (name: string): void => {
    const el = screen.getByTestId(name)
    expect(el).toBeTruthy()
}

export const testElementText = (name: string, text: string): void => {
    const el = screen.getByTestId(name)
    expect(el.textContent).toBe(text)
}
