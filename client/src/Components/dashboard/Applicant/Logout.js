import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.put("/api/v1/auth/logOut", config)
            .then((res) => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    })
    return (
        <div>
            <p>This is the Logout section</p>
        </div>
    )
}

export default Logout
