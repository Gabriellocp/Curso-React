export class UnexpectedError extends Error{
    constructor(){
        super('Aconteceu algo inesperado...')
        this.name = 'UnexpectedError'
    }
}