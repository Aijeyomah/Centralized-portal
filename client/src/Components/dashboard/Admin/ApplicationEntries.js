import React, { useState } from 'react'
import './ApplicationEntries.css';

const initialState = {
    currentSort: 'default'
}
const ApplicationEntries = () => {
    const [state, setState] = useState(initialState);
    const [sortedField, setSortedField] = useState(null);

    const tableData = [
        {
            name: 'Ify Chinke',
            email: 'ify@enyata.com',
            dob: '12/09/17',
            age: 20,
            address: '3 Sabo Ave, Yaba, Lagos',
            university: 'University of Nigeria',
            cgpa: 1.5
        },
        {
            name: 'Ify Chinke',
            email: 'ify@enyata.com',
            dob: '12/09/17',
            age: 27,
            address: '3 Sabo Ave, Yaba, Lagos',
            university: 'University of Nigeria',
            cgpa: 4.0
        },
        {
            name: 'Ify Chinke',
            email: 'ify@enyata.com',
            dob: '12/09/17',
            age: 29,
            address: '3 Sabo Ave, Yaba, Lagos',
            university: 'University of Nigeria',
            cgpa: 3.5
        },
        {
            name: 'Ify Chinke',
            email: 'ify@enyata.com',
            dob: '12/09/17',
            age: 18,
            address: '3 Sabo Ave, Yaba, Lagos',
            university: 'University of Nigeria',
            cgpa: 2.5
        }
    ];

    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a[sortedField] - b[sortedField]
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b[sortedField] - a[sortedField]
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };

    // method called every time the sort button is clicked
    // it will change the currentSort value to the next one
    const onSortChange = () => {

        const { currentSort } = state;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        setState({
            currentSort: nextSort
        });

    };

    const { currentSort } = state;
    return (
        <div className='entries_wrapper'>
            <div>
                <h2>Entries -
                    <select className="entry_box">
                        <option value='batch1'>Batch 1</option>
                        <option value='batch2'>Batch 2</option>
                        <option value='batch3'>Batch 3</option>
                    </select>
                </h2>
                <p>Comprises of all that applied for batch 2</p>
            </div>



            <table className='entries_table'>
                <thead>
                    <tr className='table_head'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>DOB-Age<button onClick={() => { setSortedField('age'); onSortChange() }}>
                            <i className={`fas fa-${sortTypes[currentSort].class}`} />
                        </button></th>
                        <th>Address</th>
                        <th>University</th>
                        <th>CGPA
                            <button onClick={() => { setSortedField('cgpa'); onSortChange() }}>
                                <i className={`fas fa-${sortTypes[currentSort].class}`} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[...tableData].sort(sortTypes[currentSort].fn).map(el => (
                        <tr className='entries_tr'>
                            <td className='entries_batch'>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.dob} - {el.age}</td>
                            <td>{el.address}</td>
                            <td>{el.university}</td>
                            <td>{el.cgpa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ApplicationEntries