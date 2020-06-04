import React, {useState} from 'react'
import './SideBar.css'
import dashIcon from '../../../Images/dashboard-icon.svg'
import assessIcon from '../../../Images/assessment-icon.svg'
import Navigation from './Navigation';
import logoutIcon from '../../../Images/logout-icon.svg'
import avatar from '../../../Images/avatar.svg'
import Modal from './modal'
import axios from 'axios'

const SideBar = (props) => {
    const [state, setState] = useState({ show: false })
    const showModal = () => {
        setState({ show: true });
    };

    const hideModal = () => {
        setState({ show: false });
    };

    const handleLogOut = (e) => {
        e.preventDefault()
        const token = localStorage.removeItem('token')
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
    }
    return (
        <div className="sidebar">
            <div className="sidebar_head">
                <div className="sidebar_wrapper">
                    <img src={avatar} onClick={showModal} alt="avatar" />
                </div>

                <p className="applicant_name">{props.first_name} {props.last_name}</p>
                <p className="applicant_email">{props.email_address}</p>

            </div>
            <Modal show={state.show} handleClose={hideModal} />
            <div className="sidebar-links">
                <Navigation url="/applicantdashboard" src={dashIcon} text="Dashboard" className="dash-inactive" activeClassName="dash-active" />
                <Navigation url="/applicantdashboard/assessment" src={assessIcon} text="Assessment" className="assess-inactive" activeClassName="assess-active" />
            </div>
            <Navigation handleLogOut={handleLogOut} url="/applicantdashboard/logout" src={logoutIcon} text="Logout" className="logout-inactive" activeClassName="logout-active" />
        </div>
    )
}

export default SideBar