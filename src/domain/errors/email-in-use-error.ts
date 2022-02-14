export class EmailInUseError extends Error {
    constructor() {
        super('E-mail já está sendo usado')
        this.name = 'EmailInUseError'
    }
}
