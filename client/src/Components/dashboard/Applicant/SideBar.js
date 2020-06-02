import React from 'react'
import './SideBar.css'
import dashIcon from '../../../Images/dashboard-icon.svg'
import assessIcon from '../../../Images/assessment-icon.svg'
import Navigation from './Navigation';
import logoutIcon from '../../../Images/logout-icon.svg'
import avatar from '../../../Images/avatar.svg'

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_head">
                <div>
                    <img src={avatar} alt="avatar" />
                </div>
                <p>John Wick</p>
                <p>Johnwick@gmail.com</p>
            </div>
            <div className="sidebar-links">
                <Navigation url="/applicantdashboard" src={dashIcon} text="Dashboard" className="dash-inactive" activeClassName="dash-active" />
                <Navigation url="/applicantdashboard/assessment" src={assessIcon} text="Assessment" className="assess-inactive" activeClassName="assess-active" />
            </div>
            <Navigation url="/applicantdashboard/logout" src={logoutIcon} text="Logout" className="logout-inactive" activeClassName="logout-active" />
        </div>
    )
}

export default SideBar