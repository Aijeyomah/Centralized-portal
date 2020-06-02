import React, { useEffect } from 'react'
import Info from './Info';
import './DashBoardHome.css'
import { ClientButton } from '../../Button/Button';
import axios from 'axios'

const DashBoardHome = () => {
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
                console.log(res.data.data.id)
            }).catch(err => {
                console.log(err.message)
            })
    }, [])

    return (
        <div className='dashboard_wrapper'>
            <div>
                <h2>Dashboard</h2>
                <p className='dashboard_italic_text'>Your Application is currently being reviewed, you wil be notified if successful</p>
            </div>
            <div className='info_wrapper'>
                <Info text="Date of Application" total_number={'09.09.19'} text2="4 days since applied" className='info_one' />
                <Info text="Application Status" total_number='Pending' text2="We will get back to you" className='info_three' />
            </div>
            <div className='dashboard_section2'>
                <div className='updates'>
                    <h4>Updates</h4>
                    <p className='updates_text'>text 1</p>
                    <p className='updates_text'>text 2</p>
                    <p className='updates_text'>text 3</p>
                    <p className='updates_text'>text 4</p>
                </div>
                <div className='dashboard_assessment'>
                    <h4>Take Assessment</h4>
                    <div>
                        <p>We have 4 days left until the next assessment <br />Watch this space</p>
                        <ClientButton text='Take Assessment' className='grayBtn' link='/applicantdashboard/assessment' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardHome;