import React, { useState } from 'react'
import './ComposeAssessment.css'
import uploadIcon from '../../../Images/upload-icon.svg'
import AssessmentSuccessful from './AssessmentSuccessful';
import axios from 'axios'

const ComposeAssessment = () => {
    const [questions, setQuestions] = useState({
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
        batch_id: "",
        set_time: "",
        cv_file: "",
        question: []
    }
    )

    const [questionLength, setQuestionLength] = useState(0)
    const [questionNo, setQuestionNo] = useState(1)
    const [prevQuestion, setprevQuestion] = useState(-1)
    const [nextQuestion, setNextQuestion] = useState(1)

    const handleFile = e => {
        let files = e.target.files[0]
        setQuestions({
            ...questions, cv_file: files
        })
    }

    const handleTime = e => {
        setQuestions({
            ...questions, [e.target.id]: e.target.value
        })
    }

    const handleInputChange = e => {
        if (questions.batch_id === "") {
            alert("Please input your Batch ID before continuing. Thanks")
            setQuestions({ ...questions, batch_id: e.target.value })
        } else {
            setQuestions({
                ...questions, [e.target.id]: e.target.value
            })
        }
    }

    const handlePreviousQuestion = () => {
        const { question } = questions
        setQuestionLength(questionLength - 1)
        setQuestionNo(questionNo - 1)
        setprevQuestion(prevQuestion - 1)
        setNextQuestion(nextQuestion - 1)
        console.log(questions.cv_file)
        let one = question[prevQuestion].question
        let two = question[prevQuestion].option_a
        let three = question[prevQuestion].option_b
        let four = question[prevQuestion].option_c
        let five = question[prevQuestion].option_d
        let six = question[prevQuestion].correct_answer
        let seven = question[prevQuestion].batch_id
        setQuestions({
            ...questions, question: one, option_a: two, option_b: three, option_c: four, option_d: five, correct_answer: six, batch_id: seven
        })
        console.log(questionLength)
    }

    const handleNextQuestion = () => {
        const { question, option_a, option_b, option_c, option_d, correct_answer, batch_id } = questions
        let questionData = { question, option_a, option_b, option_c, option_d, correct_answer, batch_id }
        const { question } = questions
        console.log(questions.cv_file)
        if (!question || !option_a || !option_b || !option_c || !option_d || !correct_answer || !batch_id) {
            alert("Please fill up all the necessary fields")
        } else if (question.length === questionLength) {
            setQuestionNo(questionNo + 1)
            question.push(questionData)
            console.log(question)
            setprevQuestion(prevQuestion + 1)
            console.log("Posted")
            setQuestionLength(questionLength + 1)
            setNextQuestion(nextQuestion + 1)
            setQuestions({
                ...questions, question: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "",
            })
        } else if (question.length > questionLength && question.length === nextQuestion) {
            setQuestions({
                ...questions, question: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "",
            })
            setNextQuestion(nextQuestion + 1)
            setprevQuestion(prevQuestion + 1)
            setQuestionNo(questionNo + 1)
            setQuestionLength(questionLength + 1)
            console.log(question)
            question[questionLength].question = questionData.question
            question[questionLength].option_a = questionData.option_a
            question[questionLength].option_b = questionData.option_b
            question[questionLength].option_c = questionData.option_c
            question[questionLength].option_d = questionData.option_d
            question[questionLength].correct_answer = questionData.correct_answer
            question[questionLength].batch_id = questionData.batch_id
        }
        else if (question.length > questionLength) {
            setprevQuestion(prevQuestion + 1)
            setQuestionNo(questionNo + 1)
            console.log(question)
            console.log("Updated")
            setNextQuestion(nextQuestion + 1)
            setQuestionLength(questionLength + 1)
            let one = question[nextQuestion].question
            let two = question[nextQuestion].option_a
            let three = question[nextQuestion].option_b
            let four = question[nextQuestion].option_c
            let five = question[nextQuestion].option_d
            let six = question[nextQuestion].correct_answer
            let seven = question[nextQuestion].batch_id
            setQuestions({
                ...questions, question: one, option_a: two, option_b: three, option_c: four, option_d: five, correct_answer: six, batch_id: seven
            })
            question[questionLength].question = questionData.question
            question[questionLength].option_a = questionData.option_a
            question[questionLength].option_b = questionData.option_b
            question[questionLength].option_c = questionData.option_c
            question[questionLength].option_d = questionData.option_d
            question[questionLength].correct_answer = questionData.correct_answer
            question[questionLength].batch_id = questionData.batch_id
        }
        if (nextQuestion === 30) {
            setQuestionNo(30)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { question, set_time, cv_file } = questions
        const Questions = { question }
        let attachment = { set_time, cv_file }
        if (set_time) {
            const token = localStorage.getItem('token')
            var formData = new FormData()

            for (var key in attachment) {
                formData.append(key, attachment[key])
            }
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            }
            const url = "/api/v1/auth/composeAssessmentAdmin"
            const url2 = "/api/v1/auth/uploadsetime"

            axios.post(url2, formData, config)
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            axios.post(url, Questions, config)
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Set time")
        }
    }

    const style = {
        display: questions.cv_file ? "block" : "none",
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "16px",
        color: "#5abefd",
        marginTop: 0,
        marginBottom: "7px",
        textAlign: "center"
    }

    return (
        <div className="compose_wrapper">
            <form onSubmit={handleSubmit} style={{ display: nextQuestion > 31 ? "none" : "block" }}>
                <p className="header_text">Compose Assessment</p>
                <div className="file_timer_wrapper">
                    <div>
                        <p>{questionNo}/30</p>
                        <div className="file_container">
                            <div>
                                <img className="upload-icon" src={uploadIcon} alt="Upload icon" />
                            </div>
                            <input type="file" name="file" id="file" className="input_file" onChange={handleFile} />
                            <label htmlFor="file">Choose File</label>
                        </div>
                        <p style={style}>Upload succesful!</p>
                    </div>
                    <div className="set_time">
                        <p>Set Time</p>
                        <select className="time-box" id="set_time" onChange={handleTime} >
                            <option value="5">00</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                        </select>
                        <p className="mins">mins</p>
                    </div>
                    <div className="set_time">
                        <p>Batch ID</p>
                        <select className="batch-box" id="batch_id" onChange={handleInputChange} >
                            <option value="--">__</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <p className="question">Question</p>
                <textarea value={questions.question} type="text" id="question" style={{ height: "200px", width: "100%" }} onChange={handleInputChange}></textarea>

                <div className="input_row_wrapper">
                    <div className="input_row">
                        <div>
                            <p>Option A</p>
                            <input value={questions.option_a} type="text" id="option_a" onChange={handleInputChange} />
                        </div>
                        <div>
                            <p>Option B</p>
                            <input value={questions.option_b} type="text" id="option_b" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="input_row">
                        <div>
                            <p>Option C</p>
                            <input value={questions.option_c} type="text" id="option_c" onChange={handleInputChange} />
                        </div>
                        <div>
                            <p>Option D</p>
                            <input value={questions.option_d} type="text" id="option_d" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="input_row_two">
                        <div>
                            <p>Answer</p>
                            <input value={questions.correct_answer} type="text" id="correct_answer" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="prev_n_next_btn">
                        <button type="button" disabled={questionNo === 1} onClick={handlePreviousQuestion} >Previous</button>
                        <button type="button" disabled={nextQuestion === 31} onClick={handleNextQuestion}>Next</button>
                    </div>
                    <p className="click_to_submit" style={{ display: nextQuestion === 31 ? "block" : "none" }}>Click finish to submit</p>
                    <div className="finish_btn">
                        <button style={{ backgroundColor: nextQuestion === 31 ? "#31d283" : "#CECECE" }} disabled={nextQuestion < 31} type="submit">Finish</button>
                    </div>
                </div>
            </form>
            <AssessmentSuccessful nextQuestion={nextQuestion} />
        </div>
    )
}

export default ComposeAssessment