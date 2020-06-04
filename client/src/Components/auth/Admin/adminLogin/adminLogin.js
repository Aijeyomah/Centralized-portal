import React, { useState } from 'react';
import logo from '../../../../Images/adminLogo.png';
import './adminLogin.css';
import { Link } from 'react-router-dom';
import eye3 from '../../../../Images/eye3.svg';
import eye4 from '../../../../Images/eye4.svg';
import axios from 'axios'
import useSpinner from './../../../../Spinner/useSpinner';
import { motion } from 'framer-motion'

const AdminLogin = (props) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const initialstate = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
    };

    const [state, setState] = useState(initialstate);
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const canBeSubmitted = () => {
        return (state.email && state.password);
    }

    const handleSpinner = () => {
        showSpinner()
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
            password: "",
            emailError: "",
            passwordError: "",
        })
        const validate = () => {
            let emailError = "";
            let passwordError = "";
            const validEmailRegex =
                RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
            if (!state.email) {
                emailError = 'Email field cannot be empty';
            } else if (!validEmailRegex.test(state.email)) {
                emailError = 'Email is invalid';
            }

            if (!state.password) {
                passwordError = 'Password field cannot be empty';
            } else if (state.password.length < 8) {
                passwordError = 'Password must be a minimum of 8 digits';
            }

            if (emailError || passwordError) {
                setState({
                    ...state,
                    emailError, passwordError
                })
                return false
            }
            return true
        }
        const isValid = validate();
        if (isValid) {
            setState(initialstate)
            const logindetails = {
                email_address: state.email,
                password: state.password
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post('/api/v1/auth/signadmin', logindetails, config)
                .then(res => {
                    localStorage.setItem('token', res.data.data.token)
                    props.history.push('/admindashboard')
                    hideSpinner()
                }).catch(err => {
                    console.log(err)
                    hideSpinner()
                })
        }

    }

    const isEnabled = canBeSubmitted();

    return (
        <div>
            <div className='body'>
                <motion.div animate={{ scale: 1.07, opacity: 1 }} className='admin_container'>
                    <div className='logoDiv'>
                        <img src={logo} className="logo" alt="logo" />
                    </div>
                    <div className='tagline'>
                        <h2 className='adminBrandName'>enyata</h2>
                        <p className='adminBrandText'>Admin Log In</p>
                    </div>
                    <form className='loginForm' onSubmit={handleSubmit} noValidate>
                        <label className='label'>Email Address</label>
                        <input className="adminInput" type='email' name='email' value={state.email} onChange={handleChange} />
                        <p className='adminErrorMsg'>{state.emailError}</p>
                        <div className='passwordWrapper'>
                            <label className='label'>Password</label>
                            <input className="adminPasswordInput" type={passwordShown ? "text" : "password"} name='password' value={state.password} onChange={handleChange} />
                            <img className='eye' onClick={togglePasswordVisiblity} src={passwordShown ? eye4 : eye3} alt='visibility_Icon' />
                            <p className='adminErrorMsg'>{state.passwordError}</p>
                        </div>
                        <button onClick={handleSpinner} disabled={!isEnabled} className={!isEnabled ? 'disabled' : 'submitBtn'} type='Submit'>Sign In</button>
                        <div className='adminLoginText'>
                            <p className='adminFormText'><Link to='/forgotPassword' >Forgot Password?</Link></p>
                        </div>
                    </form>
                </motion.div>
            </div>
            {spinner}
        </div>

    );
}
export default AdminLogin;
