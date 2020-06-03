import React, { useEffect, useState } from 'react'
import Info from './AdminInfo';
import './AdminDashBoardHome.css'
import { ClientButton } from '../../Button/Button';
import axios from 'axios'

const DashBoardHome = (props) => {
    const [application, getApplications] = useState('')
    const [applications, getApplicationBatches] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get("api/v1/getApplication", config)
            .then(res => {
                getApplications(res.data.data.count)
            }).catch(err => {
                console.log(err)
            })
        axios.get("api/v1/getAllApplicationBatches", config)
            .then(res => {
                getApplicationBatches(res.data.data.count)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    console.log(applications)
    return (
        <div className='admin_dashboard_wrapper'>
            <div>
                <h2>Dashboard</h2>
            </div>
            <div className='admin_info_wrapper'>
                <Info text="Current Applications" total_number={233} text2="Academy 2.0" className='admin_info_one' />
                <Info text="Total Applications" total_number={application} text2="All entries so far" className='admin_info_two' />
                <Info text="Academies" total_number={applications} text2="So far" className='admin_info_three' />
            </div>
            <div className='admin_dashboard_section2'>
                <div className='history'>
                    <h4>History</h4>
                    <p className='history_text'> Last Update 18:24, 22/02/19</p>
                    <table className='history_table'>
                        <tr>
                            <td className='history_batch'>Academy Batch 1</td>
                            <td className='history_students'>15 students</td>
                            <td>started 11/09/15</td>
                        </tr>
                        <tr>
                            <td className='history_batch'>Academy Batch 2</td>
                            <td className='history_students'>15 students</td>
                            <td>started 11/09/15</td>
                        </tr>
                        <tr>
                            <td className='history_batch'>Academy Batch 3</td>
                            <td className='history_students'>15 students</td>
                            <td>started 11/09/15</td>
                        </tr>
                    </table>
                </div>
                <div className='admin_dashboard_assessment'>
                    <h4>Create Assessment</h4>
                    <div>
                        <p>Create test question for an incoming academy<br /> students </p>
                        <ClientButton text='Create Assessment' className='grayBtn' link='/admindashboard/assessment' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardHome;
