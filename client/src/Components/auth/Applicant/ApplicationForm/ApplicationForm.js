import React, { useState } from 'react';
import './ApplicationForm.css'
import enyataLogo from '../../../../Images/enyata-logo.svg'
import uploadIcon from '../../../../Images/upload-icon.svg'

const ApplicationForm = (props) => {

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        date_of_birth: "",
        address: "",
        university: "",
        course_of_study: "",
        cgpa: "",
        cv_file: ""
    })

    const handleChange = e => {
        setUser({
            ...user, [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa, cv_file } = user
        let userDetails = { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa, cv_file }
        if (cv_file) { }
    }

    const handleFile = (e) => {
        let files = e.target.files
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            let result = e.target.result
            setUser({
                ...user, cv_file: result
            })
        }
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
        <div>
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
                        <input id="first_name" type="text" onChange={handleChange} required /><br />
                    </div>
                    <div>
                        <label>Last name</label>
                        <br />
                        <input id="last_name" type="text" onChange={handleChange} required /><br />
                    </div>
                </div>
                <div className="second-row">
                    <div>
                        <label>Email Address</label>
                        <br />
                        <input id="email_address" type="email" onChange={handleChange} required /><br />
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <br />
                        <input id="date_of_birth" type="text" placeholder="YYYY-MM-DD" required
                            pattern="((?:19|20)\d\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])" onChange={handleChange} /><br />
                    </div>
                </div>
                <div className="third-row">
                    <div>
                        <label>Address</label>
                        <br />
                        <input id="address" type="text" onChange={handleChange} required /><br />
                    </div>
                    <div>
                        <label>University</label>
                        <br />
                        <input id="university" type="text" onChange={handleChange} required /><br />
                    </div>
                </div>
                <div className="fourth-row">
                    <div>
                        <label>Course of Study</label>
                        <br />
                        <input id="course_of_study" type="text" onChange={handleChange} required /><br />
                    </div>
                    <div>
                        <label>CGPA</label>
                        <br />
                        <input id="cgpa" type="number" onChange={handleChange} required /><br />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ApplicationForm;
