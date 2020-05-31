import React from 'react'
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


const AdminDashboard = () => {
    return (
        <div className="_container">
            <AdminSideBar />
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