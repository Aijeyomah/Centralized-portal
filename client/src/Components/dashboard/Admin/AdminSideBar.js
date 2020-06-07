import React, { useState } from 'react'
import './AdminSideBar.css'
import dashIcon from '../../../Images/dashboard-icon.svg'
import appEntriesIcon from '../../../Images/app-entries.svg'
import createAppIcon from '../../../Images/create-app.svg'
import composeAssessIcon from '../../../Images/compose-assessment.svg'
import assessHistoryIcon from '../../../Images/assess-history.svg'
import results from '../../../Images/results.svg'
import Navigation from './../Applicant/Navigation';
import logoutIcon from '../../../Images/logout-icon.svg'
import avatar from '../../../Images/avatar.svg'
import { withRouter } from 'react-router-dom'
import Modal from './../Applicant/modal';

const AdminSideBar = (props) => {

    const [state, setState] = useState({ show: false })
    const showModal = () => {
        setState({ show: true });
    };

    const hideModal = () => {
        setState({ show: false });
    };

    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        props.history.push('/admin/login')
    }

    return (
        <div className="sidebar">
            <div className="sidebar-head">
                <div className="sidebar-wrapper">
                    <img onClick={showModal} src={avatar} alt="avatar" />
                </div>
                <p className="admin_name">{props.first_name} {props.last_name}</p>
                <p className="admin_email">{props.email_address} </p>
            </div>
            <div className="sidebar-links">
                <Navigation url="/admindashboard" src={dashIcon} text="Dashboard" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/createapplication" src={createAppIcon} text="Create Application" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/entries" src={appEntriesIcon} text="Application Entries" className="link-inactive" activeClassName="link-active" />
                <Navigation url="/admindashboard/assessment" src={composeAssessIcon} text="Compose Assessment" className="link-inactive" activeClassName="link-active" />
                {/* <Navigation url="/admindashboard/history" src={assessHistoryIcon} text="Assessment History" className="link-inactive" activeClassName="link-active" /> */}
                <Navigation url="/admindashboard/results" src={results} text="Results" className="link-inactive" activeClassName="link-active" />
            </div>
            <Navigation whileHover={{ scale: 1.1, color: '#006df0', originX: 0, type: "spring" }}
                clicked={handleLogOut} url="/admindashboard/logout" src={logoutIcon} text="Logout" className="logout-inactive" activeClassName="logout-active" />
            <Modal show={state.show} handleClose={hideModal} />
        </div>
    )
}

export default withRouter(AdminSideBar)