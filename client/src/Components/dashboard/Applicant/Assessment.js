import React, { useState,useEffect } from 'react'
import './Assessment.css'
import hourGlass from '../../../Images/hourglass.svg'
import Timer from './Timer'
import QuizData from './AssessmentQuestions'
import congratsIcon from '../../../Images/congrats.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Assessment = (props) => {
    const [questions, setQuestions] = useState({
        userAnswer: null,
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: [],
        nextQuestion: 0,
        prevQuestion: -1,
        questionNo: 1,
        userOptions: [],
        disabled: true,
        currentIndex: 0
    })

    const [userDetail, setUserDetail] = useState({ created_at: '', status: '', update: '' })
    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get("/api/v1/getapplicantdetail", config)
            .then(res => {
                setUserDetail({
                    created_at: res.data.data.created_at,
                    status: res.data.data.status
                })
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

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
        const { currentIndex, questionNo, userOptions, nextQuestion, prevQuestion } = questions
        let one = userOptions[prevQuestion]
        setQuestions({
            ...questions, currentIndex: currentIndex - 1, questionNo: questionNo - 1, nextQuestion: nextQuestion - 1, prevQuestion: prevQuestion - 1, userAnswer: one
        })
        console.log(one)
        console.log(userOptions)
    }

    const handleNextQuestion = () => {
        const { currentIndex, questionNo, userOptions, prevQuestion, nextQuestion, userAnswer, correct_answer } = questions
        let one = userOptions[nextQuestion]
        setQuestions({
            ...questions, currentIndex: currentIndex + 1, questionNo: questionNo + 1, nextQuestion: nextQuestion + 1, prevQuestion: prevQuestion + 1, userAnswer: one
        })
        if (currentIndex === userOptions.length) {
            userOptions.push(userAnswer)
            console.log(userOptions)
            console.log(nextQuestion)
            correct_answer.push(QuizData[currentIndex].correct_answer)
            console.log(correct_answer)
        }
        else if (currentIndex < userOptions.length) {
            userOptions[nextQuestion] = userAnswer
            console.log(nextQuestion)
            console.log(userOptions)
            console.log(nextQuestion)
        }
    }

    const handleSubmit = () => {
        const { currentIndex, userOptions, nextQuestion, userAnswer, correct_answer } = questions
        correct_answer.push(QuizData[currentIndex].correct_answer)
        console.log(userOptions)
        console.log(nextQuestion)
        userOptions.push(userAnswer)
        setShow(show + 1)
        clearInterval(interv)
        let userScore = questions.userOptions.filter(val => questions.correct_answer.indexOf(val) !== -1)
        console.log(userScore.length)
    }

    

    useEffect(()=>{
        return ()=>{
            if (updatedM === 29 && updatedS===59 ) {
                clearInterval(interv)
                setShow(show + 1)
            }
        }
    })

    if (questions.questionNo === 31) {
        setQuestions({
            ...questions, questionNo: 30
        })
    }

    const checkAnswer = (answer) => {
        setQuestions({
            ...questions, userAnswer: answer
        })
    }

    const { currentIndex, userAnswer, questionNo } = questions

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
                    <p className="thank-you" style={{ display: show === 3 ? "block" : "none" }} >Thank you!</p>
                </div>
                <Timer updatedM={updatedM} updatedS={updatedS} />
            </div>
            <div style={{ display: show === 1 ? "flex" : "none" }}>
                <div className="hourglass_n_content">
                    <div className="hourglass-icon">
                        <img src={hourGlass} alt="hourglass" />
                    </div>
                    <p>We have 4 days left until the next assessment. Watch this space</p>
                    <button onClick={handleNextPage} disabled={!userDetail.created_at}>Take Assessment</button>
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
                    <button disabled={questionNo === 30} type="button" onClick={handleNextQuestion}>Next</button>
                </div>
                <div class="finish-button">
                    <button style={{ backgroundColor: questionNo < 30 ? "#CECECE" : "#31D283" }} disabled={!questionNo === 30} type="submit" onClick={handleSubmit}>Finish</button>
                </div>
            </div>
            <div className="congrats" style={{ display: show === 3 ? "block" : "none" }}>
                <div >
                    <img src={congratsIcon} alt="congrats" />
                </div>
                <p>We have received your assessment test, we will get back to you soon. Best of luck</p>
                <Link to="/applicantdashboard"><button>Home</button></Link>
            </div>
        </div>
    )
}

export default Assessment