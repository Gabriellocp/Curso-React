export class MinLengthError extends Error {
    constructor(min: number) {
        super(`Campo deve ter ${min} caracteres`)
        this.name = 'MinLengthError'
    }
}