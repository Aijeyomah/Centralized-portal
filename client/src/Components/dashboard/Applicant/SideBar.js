import React from 'react'
import './SideBar.css'
import dashIcon from '../../../Images/dashboard-icon.svg'
import assessIcon from '../../../Images/assessment-icon.svg'
import Navigation from './Navigation';

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-head">

            </div>
            <div className="sidebar-links">
                <Navigation url="/applicantdashboard" src={dashIcon} text="Dashboard" className="dash-inactive" activeClassName="dash-active" />
                <Navigation url="/applicantdashboard/assessment" src={assessIcon} text="Assessment" className="assess-inactive" activeClassName="assess-active" />
            </div>
        </div>
    )
}

export default SideBar