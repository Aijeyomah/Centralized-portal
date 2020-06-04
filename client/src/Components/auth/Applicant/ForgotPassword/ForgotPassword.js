import React, { useState } from 'react';
import logo from '../../../../Images/logo.png';
import './ForgotPassword.css';
import Input from '../../../../Components/Input/Input';
import { FormButton } from '../../../../Components/Button/Button';
import axios from 'axios'
import { motion } from 'framer-motion'

const initialstate = {
    email: "",
    emailError: "",
};
export default () => {
    const [state, setState] = useState(initialstate);
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const canBeSubmitted = () => {
        return (state.email);
    }
    const handleSubmit = (e) => {
        if (!canBeSubmitted()) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        setState({
            ...state,
            email: "",
            emailError: "",
        })
        const validate = () => {
            let emailError = "";
            const validEmailRegex =
                RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

            if (!state.email) {
                emailError = 'Email field cannot be empty';
            } else if (!validEmailRegex.test(state.email)) {
                emailError = 'Email is invalid';
            }

            if (emailError) {
                setState({
                    ...state,
                    emailError
                })
                return false
            }
            return true
        }
        const isValid = validate();
        if (isValid) {
            setState(initialstate)
            const logindetails = {
                email_address: state.email
            }
            console.log(logindetails)
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post("/api/v1/auth/forgotpassword", logindetails, config)
                .then((res) => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
        }
        // console.log(state)
    }
    const isEnabled = canBeSubmitted();

    return (
        <motion.div animate={{ scale: 1.07, opacity: 1 }} className='container'>
            <div className='logoDiv'>
                <img src={logo} className="logo" alt="logo" />
            </div>
            <div className='tagline'>
                <h2 className='brandName'>enyata</h2>
                <p className='brandText'>Forgot Password</p>
            </div>
            <p className='passwordResetText'> To reset your password, input your email below</p>
            <form className='forgotPasswordForm' onSubmit={handleSubmit} noValidate>
                <Input type='email' name='email' value={state.email} handleChange={handleChange} errorMsg={state.emailError} />
                <FormButton disabled={!isEnabled} text='Send Link' />
            </form>
        </motion.div>
    );
}