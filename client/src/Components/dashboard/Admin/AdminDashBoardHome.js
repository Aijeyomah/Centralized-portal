import React from 'react'
import Info from './AdminInfo';
import './AdminDashboardHome.css'
import { ClientButton } from '../../Button/Button';

const DashBoardHome = () => {
    return (
        <div className='admin_dashboard_wrapper'>
            <div>
                <h2>Dashboard</h2>
            </div>
            <div className='admin_info_wrapper'>
                <Info text="Current Applications" total_number={233} text2="Academy 2.0" className='admin_info_one' />
                <Info text="Total Applications" total_number={4253} text2="All entries so far" className='admin_info_two' />
                <Info text="Academies" total_number={4} text2="So far" className='admin_info_three' />
            </div>
            <div className='admin_dashboard_section2'>
                <div className='history'>
                    <h4>History</h4>
                    <p className= 'history_text'> Last Update  18:24, 22/02/19</p>
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

