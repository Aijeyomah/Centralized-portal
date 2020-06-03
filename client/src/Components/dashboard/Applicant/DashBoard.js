import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SideBar from './SideBar';
import './DashBoard.css'
import { Switch, Route } from 'react-router-dom'
import Assessment from './Assessment';
import DashBoardHome from './DashBoardHome';
import Logout from './Logout'


const Dashboard = () => {
    const [userDetail, setUserDetail] = useState({ first_name: '', last_name: '', email_address: '' })
    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get("/api/v1/getuserDetail", config)
            .then(res => {
                setUserDetail({
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    email_address: res.data.data.email_address
                })
            }).catch(err => {
                console.log(err.message)
            })
    }, [])
    console.log(userDetail.first_name)
    return (
        <div className="_container">
            <SideBar first_name={userDetail.first_name} last_name={userDetail.last_name} email_address={userDetail.email_address} />
            <Switch>
                <Route exact path="/applicantdashboard/assessment" component={Assessment} />
                <Route exact path="/applicantdashboard" component={DashBoardHome} />
                <Route exact path="/applicantdashboard/logout" component={Logout} />
            </Switch>
        </div>
    )
}

export default Dashboard