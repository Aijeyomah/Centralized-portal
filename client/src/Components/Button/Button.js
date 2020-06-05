import React from "react";
import './Button.css'
import { Link } from 'react-router-dom'

export const FormButton = (props) => {
    return (
        <button onClick={props.onclick} disabled={props.disabled} className={props.disabled ? 'disabled' : 'submitBtn'} type='Submit'>{props.text}</button>
    );
}

export const ClientButton = (props) => {
    return (
        <Link to={props.link}>
            <button
                style={{ display: props.status === "Taken" ? "none" : "block" }}
                disabled={!props.disabled || props.status === "Taken"}
                className={props.className} type='button'>{props.text}
            </button>
        </Link>
    );
}

export const AdminClientButton = (props) => {
    return (
        <Link to={props.link}> <button className={props.className} type='button'>{props.text}</button></Link>
    );
}