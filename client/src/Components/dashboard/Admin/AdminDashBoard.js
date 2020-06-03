import React, { useState, useEffect } from 'react'
import AdminSideBar from './AdminSideBar';
import './AdminDashBoard.css'
import { Switch, Route } from 'react-router-dom'
import AdminDashBoardHome from './AdminDashBoardHome';
import CreateApplication from './CreateApplication';
import ApplicationEntries from './ApplicationEntries';
import ComposeAssessment from './ComposeAssessment';
import AssessmentHistory from './AssessmentHistory';
import Results from './Results';
import AdminLogout from './AdminLogout';
import axios from 'axios'


const AdminDashboard = () => {
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
            <AdminSideBar first_name={userDetail.first_name} last_name={userDetail.last_name} email_address={userDetail.email_address} />
            <Switch>
                <Route exact path="/admindashboard" component={AdminDashBoardHome} />
                <Route exact path="/admindashboard/createapplication" component={CreateApplication} />
                <Route exact path="/admindashboard/entries" component={ApplicationEntries} />
                <Route exact path="/admindashboard/assessment" component={ComposeAssessment} />
                <Route exact path="/admindashboard/history" component={AssessmentHistory} />
                <Route exact path="/admindashboard/results" component={Results} />
                <Route exact path="/admindashboard/logout" component={AdminLogout} />
            </Switch>
        </div>
    )
}

export default AdminDashboard