import { fireEvent, screen, waitFor } from "@testing-library/react"
import {SurveyResult} from "@/presentation/pages"
import { LoadSurveyResultSpy, mockSurveyResultModel, SaveSurveyResultSpy } from "@/domain/test"
import { AccessDeniedError, UnexpectedError } from "@/domain/errors"
import {createMemoryHistory, MemoryHistory} from 'history'
import { AccountModel } from "@/domain/models"
import { renderWithHistory } from "@/presentation/test"
import { LoadSurveyResult } from "@/domain/usecases"
import { surveyRestultState } from "./components/atoms/atoms"

type SutTypes = {
    loadSurveyResultSpy: LoadSurveyResultSpy
    saveSurveyResultSpy: SaveSurveyResultSpy
    history: MemoryHistory
    setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
    loadSurveyResultSpy?: LoadSurveyResultSpy
    saveSurveyResultSpy?: SaveSurveyResultSpy
    initialState?: 
        {
            isLoading: boolean,
            error: string,
            surveyResult: LoadSurveyResult.Model,
            reload: boolean
        }
    
}

const makeSut = ({loadSurveyResultSpy = new LoadSurveyResultSpy(), saveSurveyResultSpy = new SaveSurveyResultSpy(), initialState = null} : SutParams = {}): SutTypes => {
    const history = createMemoryHistory({initialEntries: ['/', '/surveys/any_id'], initialIndex:1})
    const {setCurrentAccountMock} = renderWithHistory({
        history,
        Page: ()=> SurveyResult({
            loadSurveyResult: loadSurveyResultSpy,
            saveSurveyResult: saveSurveyResultSpy
        }),
        states: initialState ? [{atom: surveyRestultState, value: initialState}] : []
    })

    // render(
    //     <RecoilRoot initializeState={({set})=> set(currentAccountState,mockedState)}>
    //             <Router history={history}>
    //                 <SurveyResult 
    //                     loadSurveyResult={loadSurveyResultSpy} 
    //                     saveSurveyResult={saveSurveyResultSpy}
    //                 ></SurveyResult>
    //             </Router>
    //     </RecoilRoot>
    //     )
    return {
        loadSurveyResultSpy,
        saveSurveyResultSpy,
        history,
        setCurrentAccountMock
    }
}

describe('SurveyResult Component', ()=> {
    test('Should present correct initial state', async ()=>{
        makeSut()
        const surveyResult = screen.getByTestId('survey-result')
        expect(surveyResult.childElementCount).toBe(0)
        expect(screen.queryByTestId('error')).not.toBeInTheDocument()
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
        await waitFor(() => surveyResult)

    })
    test('Should call LoadSurveyResult', async ()=>{
        const {loadSurveyResultSpy} = makeSut()
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(loadSurveyResultSpy.callsCount).toBe(1)
    })
    test('Should present SurveyResult on success', async ()=>{
        const loadSurveyResultSpy = new LoadSurveyResultSpy()
        const surveyResult = Object.assign(mockSurveyResultModel(),{
            question:'',
            date: new Date('2020-01-10T00:00:00')
        })
        loadSurveyResultSpy.surveyResult = surveyResult
        makeSut({loadSurveyResultSpy}) 
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(screen.getByTestId('day')).toHaveTextContent('10')
        expect(screen.getByTestId('month')).toHaveTextContent('jan')
        expect(screen.getByTestId('year')).toHaveTextContent('2020')
        expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
        expect(screen.getByTestId('answers').childElementCount).toBe(2)
        const answersWrap = screen.queryAllByTestId('answer-wrap')
        expect(answersWrap[0]).toHaveClass('active')
        expect(answersWrap[1]).not.toHaveClass('active')
        const images = screen.queryAllByTestId('image')
        expect(images[0]).toHaveAttribute('src',surveyResult.answers[0].image)
        expect(images[0]).toHaveAttribute('alt',surveyResult.answers[0].answer)
        expect(images[1]).toBeFalsy()
        const answers = screen.queryAllByTestId('answer')
        expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
        expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
        const percents = screen.queryAllByTestId('percent')
        expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
        expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
    })
    test('Should render error on UnexpectedError', async ()=>{
        const loadSurveyResultSpy = new LoadSurveyResultSpy()
        const error = new UnexpectedError()
        jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
        makeSut({loadSurveyResultSpy})
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(screen.getByTestId('error')).toHaveTextContent(error.message)
        expect(screen.queryByTestId('question')).not.toBeInTheDocument()
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()

    })
    test('Should logout on AcessDeniedError', async ()=>{
        const loadSurveyResultSpy = new LoadSurveyResultSpy()
        // const error = new AccessDeniedError()
        jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
        const { setCurrentAccountMock, history} = makeSut({loadSurveyResultSpy})
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
        expect(history.location.pathname).toBe('/login')
    })
    test('Should call LoadSurveyResult on reload', async ()=>{
        const loadSurveyResultSpy = new LoadSurveyResultSpy()
        // const error = new AccessDeniedError()
        jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
        makeSut({loadSurveyResultSpy})
        await waitFor(() => screen.getByTestId('survey-result'))
        fireEvent.click(screen.getByTestId('reload'))
        expect(loadSurveyResultSpy.callsCount).toBe(1)
        await waitFor(() => screen.getByTestId('survey-result')) 
    })
    test('Should go to SurveyList on back button click', async ()=>{
        const {history} = makeSut()
        // const error = new AccessDeniedError()
        await waitFor(()=> screen.getByTestId('survey-result')) 
        fireEvent.click(screen.getByTestId('backbutton'))
        expect(history.location.pathname).toBe('/')
    })
    test('Should do nothing if answer clicked is already selected', async ()=>{
        makeSut()
        await waitFor(()=> screen.getByTestId('survey-result')) 
        const answersWrap = screen.queryAllByTestId('answer-wrap')
        fireEvent.click(answersWrap[0])
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    test('Should call SaveSurveyResult on non-active answer click', async ()=>{
        const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut()
        await waitFor(()=> screen.getByTestId('survey-result')) 
        const answersWrap = screen.queryAllByTestId('answer-wrap')
        fireEvent.click(answersWrap[1])
        await waitFor(() => expect(screen.queryByTestId('loading')).toBeInTheDocument())
        expect(saveSurveyResultSpy.params).toEqual({
            answer: loadSurveyResultSpy.surveyResult.answers[1].answer
        })
    })
    test('Should render error on UnexpectedError', async ()=>{
        const saveSurveyResultSpy = new SaveSurveyResultSpy()
        const error = new UnexpectedError()
        jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
        makeSut({saveSurveyResultSpy})
        await waitFor(() => screen.getByTestId('survey-result'))
        const answersWrap = screen.queryAllByTestId('answer-wrap')
        fireEvent.click(answersWrap[1])
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(screen.getByTestId('error')).toHaveTextContent(error.message)
        expect(screen.queryByTestId('question')).not.toBeInTheDocument()
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    test('Should logout on AcessDeniedError', async ()=>{
        const saveSurveyResultSpy = new SaveSurveyResultSpy()
        jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new AccessDeniedError())
        const { setCurrentAccountMock, history} = makeSut({saveSurveyResultSpy})
        await waitFor(() => screen.getByTestId('survey-result'))
        const answersWrap = screen.queryAllByTestId('answer-wrap')
        
        await waitFor(() => {
        screen.getByTestId('survey-result')
        fireEvent.click(answersWrap[1])    
        })
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
        expect(history.location.pathname).toBe('/login')
    })
    test('Should present SurveyResult on SaveSurveyResult success', async ()=>{
        const saveSurveyResultSpy = new SaveSurveyResultSpy()
        const surveyResult = Object.assign(mockSurveyResultModel(),{
            question:'',
            date: new Date('2018-02-20T00:00:00')
        })
        saveSurveyResultSpy.surveyResult = surveyResult
        makeSut({saveSurveyResultSpy}) 
        await waitFor(() => screen.getByTestId('survey-result'))
        const answersWrap = screen.queryAllByTestId('answer-wrap')
        fireEvent.click(answersWrap[1])
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(screen.getByTestId('day')).toHaveTextContent('20')
        expect(screen.getByTestId('month')).toHaveTextContent('fev')
        expect(screen.getByTestId('year')).toHaveTextContent('2018')
        expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
        expect(screen.getByTestId('answers').childElementCount).toBe(2)
        expect(answersWrap[0]).toHaveClass('active')
        expect(answersWrap[1]).not.toHaveClass('active')
        const images = screen.queryAllByTestId('image')
        expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
        expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
        expect(images[1]).toBeFalsy()
        const answers = screen.queryAllByTestId('answer')
        expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
        expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
        const percents = screen.queryAllByTestId('percent')
        expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
        expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
        
        })
    test('Should prevent multiple answer clicks',async ()=>{
        const initialState = {
            isLoading: true,
            error: '',
            surveyResult: null,
            reload: false
        }
        const {saveSurveyResultSpy} = makeSut({initialState})
        await waitFor(()=> screen.getByTestId('survey-result')) 
        const answersWrap = screen.queryAllByTestId('answer-wrap')
        fireEvent.click(answersWrap[1])
        await waitFor(()=> screen.getByTestId('survey-result'))
        expect(saveSurveyResultSpy.callsCount).toBe(0)
    })
})