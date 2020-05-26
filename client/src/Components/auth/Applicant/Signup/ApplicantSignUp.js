import React, { useState } from 'react';
import './ApplicantSignUp.css'
import enyataLogo from '../../../../Images/enyata-logo.svg'
import eye from '../../../../Images/eye.svg'
import eyeSlashed from '../../../../Images/eye-slashed.svg'
import { Link } from 'react-router-dom'

const ApplicantSignUp = (props) => {
    const [state, setState] = useState({
        isPasswordShown: false,
        isConfirmPasswordShown: false
    })

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: "",
        password: "",
        confirm_password: "",
    })

    const handleInputChange = e => {
        setUser({
            ...user, [e.target.id]: e.target.value
        })
    }

    const togglePassword = () => {
        const { isPasswordShown } = state
        setState({
            isPasswordShown: !isPasswordShown
        })
    }

    const toggleConfirmPassword = () => {
        const { isConfirmPasswordShown } = state
        setState({
            isConfirmPasswordShown: !isConfirmPasswordShown
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { first_name, last_name, email_address, phone_number, password, confirm_password } = user
        let userDetails = { first_name, last_name, email_address, phone_number, password, confirm_password }
        console.log(userDetails)
    }

    return (
        <form className="signup_wrapper" onSubmit={handleSubmit}>
            <div className="enyata-logo">
                <img src={enyataLogo} alt="Enyata logo" />
            </div>
            <p className="applicant">Applicant Sign Up</p>
            <div className="first-row">
                <div>
                    <label>First name</label>
                    <br />
                    <input id="first_name" type="text" onChange={handleInputChange} required /><br />
                </div>
                <div>
                    <label>Last name</label>
                    <br />
                    <input id="last_name" type="text" onChange={handleInputChange} required /><br />
                </div>
            </div>
            <div className="second-row">
                <div>
                    <label>Email Address</label>
                    <br />
                    <input id="email_address" type="email" onChange={handleInputChange} required /><br />
                </div>
                <div>
                    <label>Phone Number</label>
                    <br />
                    <input id="phone_number" type="tel" onChange={handleInputChange} required /><br />
                </div>
            </div>
            <div className="third-row">
                <div>
                    <label>Password</label>
                    <br />
                    <input id="password" type={(state.isPasswordShown) ? "text" : "password"} onChange={handleInputChange} required /><br />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <br />
                    <input id="confirm_password" type={(state.isConfirmPasswordShown) ? "text" : "password"} onChange={handleInputChange} required /><br />
                </div>
                <div className="eye-icon">
                    <img onClick={togglePassword} src={(state.isPasswordShown) ? eyeSlashed : eye} alt="eye" />
                </div>
                <div className="second-eye">
                    <img onClick={toggleConfirmPassword} src={(state.isConfirmPasswordShown) ? eyeSlashed : eye} alt="eye" />
                </div>
            </div>
            <button type="submit">Sign Up</button>
            <p className="sign-in-link">Already have an account? <span ><Link to="/login">Sign in</Link></span></p>
        </form>
    )
}

export default ApplicantSignUp
