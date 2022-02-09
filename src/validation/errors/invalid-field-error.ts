export class InvalidFieldErrror extends Error {
    constructor(fieldName: string) {
        super(`${fieldName} inválido`)

    }
}
