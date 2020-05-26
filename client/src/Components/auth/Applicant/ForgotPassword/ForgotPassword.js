import React, {useState} from 'react';
import logo from '../../../../Images/logo.png';
import './ForgotPassword.css';
import Input from '../../../../Components/Input/Input';
import { FormButton } from '../../../../Components/Button/Button';

const initialstate = { 
    email: "",
    emailError: "",
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
            let emailError= "";
            const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

            if(!state.email) {
                emailError = 'Email field cannot be empty';
            } else if(!validEmailRegex.test(state.email)) {
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
                email: state.email
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
                <p className= 'brandText'>Forgot Password</p>
            </div>
            <p className='passwordResetText'> To reset your password, input your email below</p>
            <form className= 'forgotPasswordForm' onSubmit={handleSubmit} noValidate>
                <Input type='email' name='email' value={state.email} handleChange={handleChange} errorMsg={state.emailError} />
                <FormButton disabled={!isEnabled} text='Send Link' />
            </form> 
        </div>
    );
} 