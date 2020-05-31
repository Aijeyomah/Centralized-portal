import {useState} from 'react';
import axios from 'axios'

const initialstate = { 
    email_address: "",
    password: "",
    emailError: "",
    passwordError: "",
};

const useInput = () => {
    const [state, setState] = useState(initialstate);
    const handleChange = (e) => {
        setState({ 
            ...state,
            [e.target.name]: e.target.value
        });  
    };
    const canBeSubmitted =() => {
        return (state.email_address && state.password);
    }
    const handleSubmit = (e) => {
        if (!canBeSubmitted()) {
            e.preventDefault();
            return;
        }
        e.preventDefault();        
        setState({
            ...state,
            email_address: "",
            password: "",
            emailError: "",
            passwordError: "",
        })
        const validate = () => {
            let emailError= "";
            let passwordError= "";
            const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

            if(!state.email_address) {
                emailError = 'Email field cannot be empty';
            } else if(!validEmailRegex.test(state.email_address)) {
                emailError = 'Email is invalid';
            }
            
            if(!state.password) {
                passwordError = 'Password field cannot be empty';
            } else if (state.password.length < 8) {
                passwordError= 'Password must be a minimum of 8 digits';
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
                email_address: state.email_address,
                password: state.password
                }
                let config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            axios.post('http://localhost:8000/api/v1/auth/signin', logindetails, config )
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
        // console.log(state)
    }
    
    const isEnabled = canBeSubmitted();
    return [state, handleChange, handleSubmit, isEnabled];
}

export default useInput;