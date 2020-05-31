import React from 'react'
import './AdminSideBar.css'
import dashIcon from '../../../Images/dashboard-icon.svg'
import appEntriesIcon from '../../../Images/app-entries.svg'
import createAppIcon from '../../../Images/create-app.svg'
import composeAssessIcon from '../../../Images/compose-assessment.svg'
import assessHistoryIcon from '../../../Images/assess-history.svg'
import results from '../../../Images/results.svg'
import Navigation from './../Applicant/Navigation';
import logoutIcon from '../../../Images/logout-icon.svg'

const AdminSideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-head">

            </div>
            <div className="sidebar-links">
                <Navigation url="/admindashboard" src={dashIcon} text="Dashboard" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/createapplication" src={createAppIcon} text="Create Application" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/entries" src={appEntriesIcon} text="Application Entries" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/assessment" src={composeAssessIcon} text="Compose Assessment" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/history" src={assessHistoryIcon} text="Assessment History" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/results" src={results} text="Results" className="link-inactive" activeClassName="link-active" />
            </div>
            <Navigation url="/admindashboard/logout" src={logoutIcon} text="Logout" className="logout-inactive" activeClassName="logout-active" />
        </div>
    )
}

export default AdminSideBar