import React, {useState} from 'react';
import logo from '../../../../Images/logo.png';
import './ForgotPassword.css';
import {PasswordInput} from '../../../../Components/Input/Input';
import { FormButton } from '../../../../Components/Button/Button';

const initialstate = { 
    password: "",
    passwordError: "",
};
export default ()=> {
    const [state, setState] = useState(initialstate);
    const handleChange = (e) => {
        setState({ 
            ...state,
            [e.target.name]: e.target.value
        });  
    };
    const canBeSubmitted =() => {
        return (state.password);
    }
    const handleSubmit = (e) => {
        if (!canBeSubmitted()) {
            e.preventDefault();
            return;
        }
        e.preventDefault();        
        setState({
            ...state,
            password: "",
            passwordError: "",
        })
        const validate = () => {
            let passwordError= "";
  if(!state.password) {
    passwordError = 'Password field cannot be empty';
} else if (state.password.length < 8) {
    passwordError= 'Password must be a minimum of 8 digits';
}

            if (passwordError) {
                setState({
                    ...state,
                    passwordError
                })
                return false
            }
            return true
        }
        const isValid = validate();
        if (isValid) {
            setState(initialstate)
            const logindetails = {
                password: state.password
                }
                console.log(logindetails) 
        }
        // console.log(state)
    }
    const isEnabled = canBeSubmitted();

    return(
        <div className= 'container'>
            <div className= 'logoDiv'>
                <img src={logo} className="logo" alt="logo" />
            </div>
            <div className='tagline'>
                <h2 className= 'brandName'>enyata</h2>
                <p className= 'brandText'>Reset Password</p>
            </div>
            <p className='passwordResetText'> Input a new password</p>
            <form className= 'forgotPasswordForm' onSubmit={handleSubmit} noValidate>
            <PasswordInput name='password' value={state.password} handleChange={handleChange} errorMsg={state.passwordError} />
                <FormButton disabled={!isEnabled} text='Reset Password' />
            </form> 
        </div>
    );
} 