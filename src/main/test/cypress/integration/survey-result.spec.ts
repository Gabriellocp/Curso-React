import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'
const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path)
const mockSuccess = () : void => Http.mockOk(path, 'survey-result')
const mockAccessDeniedError = ():void => Http.mockForbiddenError(path)
describe('SurveyResult', () => {
    beforeEach(() => {
        cy.fixture('account').then(account=>{
            Helpers.setLocalStorageItem('account',account)
        })
    })
    it('Should present error on UnexpectedError', () => {
        cy.visit('/surveys/any_id')
        mockUnexpectedError()
        cy.getByTestId('error').should('contain.text','Aconteceu algo inesperado...')
    })
    it('Should reload page when button is clicked', () => {
        cy.visit('/surveys/any_id')
        mockUnexpectedError()
        cy.getByTestId('error').should('contain.text','Aconteceu algo inesperado...')
        mockSuccess()
        cy.getByTestId('reload').click()
        cy.getByTestId('question').should('exist')
    })
    it('Should logout on AccessDeniedError', () => {
        cy.visit('/surveys/any_id')
        mockAccessDeniedError()
        Helpers.testUrl('/login')
    })
    it('Should present SurveyResult', () => {
        cy.visit('/surveys/any_id')
        mockSuccess()
        cy.getByTestId('question').should('have.text', ' Question 1 ')
        cy.getByTestId('day').should('have.text','03')
        cy.getByTestId('month').should('have.text','fev')
        cy.getByTestId('year').should('have.text','2018')
        cy.get('li:nth-child(1)').then(li => {
            assert.equal(li.find('[data-testid="answer"]').text(),'any_answer')
            assert.equal(li.find('[data-testid="image"]').attr('src'),'any_image')
            assert.equal(li.find('[data-testid="percent"]').text(),'70%')
            }    
        )
        cy.get('li:nth-child(2)').then(li => {
            assert.equal(li.find('[data-testid="answer"]').text(),'any_answer_2')
            assert.notExists(li.find('[data-testid="image"]'))
            assert.equal(li.find('[data-testid="percent"]').text(),'50%')
            }    
        )
    })
    it('Should go back when button is clicked', () => {
        // cy.visit('/').then(()=>cy.visit('/surveys/any_id'))
        cy.visit('/')
        cy.visit('/surveys/any_id')
        mockSuccess()
        cy.getByTestId('backbutton').click()
        Helpers.testUrl('/')
    })
    
})