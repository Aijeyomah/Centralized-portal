import React, { useState } from 'react';
import logo from '../../../../Images/adminLogo.png';
import './adminLogin.css';
import { Link } from 'react-router-dom';
import useInput from '../../../../Hooks/useInput';
import eye3 from '../../../../Images/eye3.svg';
import eye4 from '../../../../Images/eye4.svg';

const AdminLogin = () => {
    const [state, handleChange, handleSubmit, isEnabled] = useInput();
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    return (
        <div className='body'>
            <div className='admin_container'>
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
                    <button disabled={!isEnabled} className={!isEnabled ? 'disabled' : 'submitBtn'} type='Submit'>Sign In</button>
                    <div className='adminLoginText'>
                        <p className='adminFormText'><Link to='/forgotPassword' >Forgot Password?</Link></p>
                    </div>
                </form>
            </div>
        </div>

    );
}
export default AdminLogin;
