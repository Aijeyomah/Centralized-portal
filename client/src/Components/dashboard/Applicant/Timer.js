import React, { useState } from 'react'

const Timer = (props) => {
    const [timer, setTimer] = useState({
        m: 0,
        s: 0
    })

    let updatedM = timer.m
    let updatedS = timer.s

    

    return (
        <div className="timer-section">
            <p className="timer-text">Timer</p>
            <div className="timer-count">
                <p className="timer-count-mins">{timer.m >= 10 ? timer.m : "0" + timer.m}</p>
                <p className="timer-count-sec">{timer.s >= 10 ? timer.s : "0" + timer.s}</p>
            </div>
            <p className="minutes">mins</p>
            <p className="sec">sec</p>
        </div>
    )
}
export default Timer
