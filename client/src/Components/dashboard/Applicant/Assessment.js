import React, { useState } from 'react'
import './Assessment.css'
import hourGlass from '../../../Images/hourglass.svg'
import Timer from './Timer'
import QuizData from './AssessmentQuestions'

const Assessment = (props) => {
    const [questions, setQuestions] = useState({
        userAnswer: null,
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
        questionNo: 1,
        disabled: true,
        currentIndex: 0
    })

    const [show, setShow] = useState(1)
    const [interv, setInterv] = useState("")
    const [time, setTime] = useState({
        m: 0,
        s: 0
    })

    let updatedM = time.m, updatedS = time.s

    const handleNextPage = () => {
        setShow(show + 1)
        run()
        setInterv(setInterval(run, 1000));
    }

    const run = () => {
        if (updatedM === 59) {
            updatedM = -1
        }
        if (updatedS === 59) {
            updatedS = -1
            updatedM++
        }
        updatedS++
        setTime({ ...time, m: updatedM, s: updatedS })
    }

    const handlePreviousQuestion = () => {
        const { currentIndex, questionNo } = questions
        setQuestions({
            ...questions, currentIndex: currentIndex - 1, questionNo: questionNo - 1
        })
    }

    const handleNextQuestion = () => {
        const { currentIndex, questionNo } = questions
        setQuestions({
            ...questions, currentIndex: currentIndex + 1, questionNo: questionNo + 1
        })
    }

    if (updatedM === 30) {
        clearInterval(interv)
    }

    const checkAnswer = (answer) => {
        setQuestions({
            ...questions, userAnswer: answer
        })
    }

    const { question, option_a, option_b, option_c, option_d, correct_answer, currentIndex, userAnswer, questionNo } = questions

    return (
        <div>
            <div className="assessment_n_timer">
                <div>
                    <p className="top-text">Take Assessment</p>
                    <p style={{ display: show === 1 ? "block" : "none" }} className="bottom-text">Click the button below to start assessment, you have
                    limited time for this test</p>
                    <p style={{ display: show === 2 ? "block" : "none" }} className="bottom-text">Click the finish button below to submit
                    assessment, you can go back at any time to edit your answers.
                    </p>
                </div>
                <Timer updatedM={updatedM} updatedS={updatedS} />
            </div>
            <div style={{ display: show === 1 ? "flex" : "none" }}>
                <div className="hourglass_n_content">
                    <div className="hourglass-icon">
                        <img src={hourGlass} alt="hourglass" />
                    </div>
                    <p>We have 4 days left until the next assessment. Watch this space</p>
                    <button onClick={handleNextPage}>Take Assessment</button>
                </div>
            </div>
            <div style={{ display: show === 2 ? "block" : "none" }}>
                <div className="question-display">
                    <h2>Question {questionNo} of 30</h2>
                    <h1>{QuizData[currentIndex].question}</h1>
                    <p className={userAnswer === QuizData[currentIndex].option_a ? "clicked" : "options"} onClick={() => checkAnswer(QuizData[currentIndex].option_a)}>{QuizData[currentIndex].option_a}</p>
                    <p className={userAnswer === QuizData[currentIndex].option_b ? "clicked" : "options"} onClick={() => checkAnswer(QuizData[currentIndex].option_b)}>{QuizData[currentIndex].option_b}</p>
                    <p className={userAnswer === QuizData[currentIndex].option_c ? "clicked" : "options"} onClick={() => checkAnswer(QuizData[currentIndex].option_c)}>{QuizData[currentIndex].option_c}</p>
                    <p className={userAnswer === QuizData[currentIndex].option_d ? "clicked" : "options"} onClick={() => checkAnswer(QuizData[currentIndex].option_d)}>{QuizData[currentIndex].option_d}</p>
                </div>
                <div className="prev-n-next-button">
                    <button disabled={questionNo === 1} type="button" onClick={handlePreviousQuestion}>Previous</button>
                    <button type="button" onClick={handleNextQuestion}>Next</button>
                </div>
                <div class="finish-button">
                    <button type="submit">Finish</button>
                </div>
            </div>
        </div>
    )
}

export default Assessment