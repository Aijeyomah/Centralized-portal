import React, { useState } from 'react'
import './Assessment.css'
import hourGlass from '../../../Images/hourglass.svg'
import Timer from './Timer'

const Assessment = () => {
    const [show, setShow] = useState(true)

    const handleNextView = () => {
        setShow(false)
        console.log("Hello")
    }

    return (
        <div>
            <div className="assessment_n_timer">
                <div>
                    <p className="top-text">Take Assessment</p>
                    <p style={{ display: show ? "block" : "none" }} className="bottom-text">Click the button below to start assessment, you have 
                    limited time for this test</p>
                    <p style={{ display: !show ? "block" : "none" }} className="bottom-text">Click the finish button below to submit
                    assessment, you can go back at any time to edit your answers.
                    </p>
                </div>
                <Timer />
            </div>
            <div style={{ display: show ? "flex" : "none" }}>
                <div className="hourglass_n_content">
                    <div className="hourglass-icon">
                        <img src={hourGlass} alt="hourglass"/>
                    </div>
                <p>We have 4 days left until the next assessment. Watch this space</p>
                <button onClick={handleNextView}>Take Assessment</button>
                </div>
            </div>
        </div>
    )
}

export default Assessment