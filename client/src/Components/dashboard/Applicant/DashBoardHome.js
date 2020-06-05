import React, { useEffect, useState } from 'react'
import Info from './Info';
import './DashBoardHome.css'
import { ClientButton } from '../../Button/Button';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const DashBoardHome = (props) => {
    const [userDetail, setUserDetail] = useState({ created_at: '', status: '', update: '' })

    useEffect(() => {

        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get("/api/v1/getapplicantdetail", config)
            .then(res => {
                setUserDetail({
                    created_at: res.data.data.created_at,
                    status: res.data.data.status
                })
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    if (userDetail.created_at === '') {
        setUserDetail({
            update: <Link to="/applicationform">Fill in the form to take assessment now</Link>
        })
    }
    return (
        <div className='dashboard_wrapper'>
            <div>
                <h2>Dashboard</h2>
                <p className='dashboard_italic_text'>Your Application is currently being reviewed, you wil be notified if successful</p>
            </div>
            <div className='info_wrapper'>
                <Info text="Date of Application" total_number={userDetail.created_at} text2="4 days since applied" className='info_one' />
                <Info text="Application Status" total_number={userDetail.status} text2="We will get back to you" className='info_three' />
            </div>
            <div className='dashboard_section2'>
                <div className='updates'>
                    <h4>Updates</h4>
                    <p className='updates_text'>{!userDetail.update ? "No updates yet" : userDetail.update}</p>
                    <p className='updates_text'>text 2</p>
                    <p className='updates_text'>text 3</p>
                    <p className='updates_text'>text 4</p>
                </div>
                <div className='dashboard_assessment'>
                    <h4>Take Assessment</h4>
                    <div>
                        <p style={{ display: userDetail.status === "Taken" ? "block" : "none" }}>Congrats! You have completed the assessment successfully</p>
                        <p style={{ display: userDetail.created_at && userDetail.status === "Pending" ? "block" : "none" }}>Start your assessment now</p>
                        <p style={{ display: !userDetail.created_at ? "block" : "none" }}>Fill the application form in order to take assessment</p>
                        <div style={{ display: props.status === "Taken" ? "none" : "block", margin: 0 }}>
                            <ClientButton status={userDetail.status} disabled={userDetail.created_at} text='Take Assessment' className='grayBtn' link='/applicantdashboard/assessment' />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashBoardHome;