import React from 'react'
import SideBar from './SideBar';
import './DashBoard.css'
import { Switch, Route } from 'react-router-dom'
import Assessment from './Assessment';
import DashBoardHome from './DashBoardHome';
import Logout from './Logout'


const Dashboard = () => {
    return (
        <div className="_container">
            <SideBar />
            <Switch>
                <Route exact path="/applicantdashboard/assessment" component={Assessment} />
                <Route exact path="/applicantdashboard" component={DashBoardHome} />
                <Route exact path="/applicantdashboard/logout" component={Logout} />
            </Switch>
        </div>
    )
}

export default Dashboard