import React, { useState } from 'react'

const Timer = () => {
    const [timer, setTimer] = useState({
        m: 0,
        ms: 0
    })

    return (
        <div className="timer-section">
            <p className="timer-text">Timer</p>
            <div className="timer-count">
                <p className="timer-count-mins">{timer.m >= 10 ? timer.m : "0" + timer.m}</p>
                <p className="timer-count-sec">{timer.ms >= 10 ? timer.ms : "0" + timer.ms}</p>
            </div>
            <p className="minutes">mins</p>
            <p className="sec">sec</p>
        </div>
    )
}
export default Timer
