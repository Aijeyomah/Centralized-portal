import React, { useState } from 'react';
import './ApplicationForm.css'
import enyataLogo from '../../../../Images/enyata-logo.svg'
import uploadIcon from '../../../../Images/upload-icon.svg'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import useSpinner from './../../../../Spinner/useSpinner';
import { motion } from 'framer-motion'

const ApplicationForm = (props) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        date_of_birth: "",
        address: "",
        university: "",
        course_of_study: "",
        cgpa: "",
        cv_file: "",
        message: "",
        emailVal: ""
    })

    const handleChange = e => {
        setUser({
            ...user, [e.target.id]: e.target.value
        })
    }

    const handleSpinner = () => {
        const { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa, cv_file } = user
        if (!first_name || !last_name || !email_address || !date_of_birth || !address || !university || !course_of_study || !cgpa || !cv_file) {
            hideSpinner()
        } else {
            showSpinner()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa, cv_file } = user
        let userDetails = { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa, cv_file }
        setUser({
            first_name: "", last_name: "", email_address: "", date_of_birth: "", address: "", university: "", course_of_study: "", cgpa: "", cv_file: "",
        })
        let file = cv_file
        if (file) {

            console.log(file)
            const token = localStorage.getItem('token')
            var formData = new FormData()

            for (var key in userDetails) {
                formData.append(key, userDetails[key])
            }
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            }

            axios.post("/api/v1/auth/Applicationform", formData, config)

                .then(res => {
                    setUser({
                        message: res.data.message
                    })
                    console.log(res)
                    hideSpinner()
                    props.history.push('/applicantdashboard')
                }
                ).catch(err => {
                    setUser({
                        emailVal: "Email must match your sign up email"
                    })
                    hideSpinner()
                })
        } else { alert("Upload your CV") }
    }

    const handleFile = (e) => {
        let files = e.target.files[0]
        setUser({
            ...user, cv_file: files,
        })
    }

    const style = {
        display: user.cv_file ? "block" : "none",
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "16px",
        color: "#5abefd",
        marginTop: 0,
        marginBottom: "7px",
        textAlign: "center"
    }

    return (
        <motion.div animate={{ scale: 1.07, opacity: 1 }}>
            <div className="enyata-logo">
                <img src={enyataLogo} alt="Enyata logo" />
            </div>
            <p className="applicant">Application Form</p>
            <form className="signup-wrapper" onSubmit={handleSubmit}>
                <div className="file-container">
                    <div>
                        <img className="upload-icon" src={uploadIcon} alt="Upload icon" />
                    </div>
                    <input type="file" name="file" id="file" className="inputfile" onChange={handleFile} />
                    <label htmlFor="file">Upload CV</label>
                </div>
                <div style={style}>Upload successful!</div>
                <div className="first-row">
                    <div>
                        <label>First name</label>
                        <br />
                        <input value={user.first_name} id="first_name" type="text" onChange={handleChange} required /><br />
                    </div>
                    <div>
                        <label>Last name</label>
                        <br />
                        <input value={user.last_name} id="last_name" type="text" onChange={handleChange} required /><br />
                    </div>
                </div>
                <div className="second-row">
                    <div>
                        <label>Email Address</label>
                        <br />
                        <input value={user.email_address} id="email_address" type="email" onChange={handleChange}
                            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                            required /><br />
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <br />
                        <input value={user.date_of_birth} id="date_of_birth" type="text" placeholder="YYYY-MM-DD" required
                            pattern="((?:19|20)\d\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])" onChange={handleChange} /><br />
                    </div>
                </div>
                <div className="third-row">
                    <div>
                        <label>Address</label>
                        <br />
                        <input value={user.address} id="address" type="text" onChange={handleChange} required /><br />
                    </div>
                    <div>
                        <label>University</label>
                        <br />
                        <input value={user.university} id="university" type="text" onChange={handleChange} required /><br />
                    </div>
                </div>
                <div className="fourth-row">
                    <div>
                        <label>Course of Study</label>
                        <br />
                        <input value={user.course_of_study} id="course_of_study" type="text" onChange={handleChange} required /><br />
                    </div>
                    <div>
                        <label>CGPA</label>
                        <br />
                        <input value={user.cgpa} id="cgpa" type="number" onChange={handleChange} required /><br />
                    </div>
                </div>
                <p className="message" style={{ color: "green" }}>{user.message}</p>
                <p className="message" style={{ color: "red" }}>{user.emailVal}</p>
                <button onClick={handleSpinner} type="submit">Submit</button>
            </form>
            {spinner}
        </motion.div>
    )
}

export default withRouter(ApplicationForm);