import React from 'react'
import SpinnerIcon from './SpinnerIcon';
import './Spinner.css'
import { motion } from 'framer-motion'

const Spinner = (props) => {
    return (
        <div className="spin" >
            <div initial={{ y: -350, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="spinner">
                <SpinnerIcon />
            </div>
        </div>
    )
}

export default Spinner
