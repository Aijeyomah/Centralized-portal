import React from "react";
import './Button.css'

export const FormButton = (props) => {
    return(
        <button disabled={props.disabled} className= {props.disabled ? 'disabled' : 'submitBtn'} type='Submit'>{props.text}</button>
    );
}