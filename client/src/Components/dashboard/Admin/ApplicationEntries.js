import React from 'react'
import './ApplicationEntries.css';


const ApplicationEntries = () => {
    // const state = {
	// 	currentSort: 'default'
    // };
    
    // const tableData = [
    //     {
    //         name: 'Amancio Ortega',
    //         net_worth: 62.7
    //     },
    //     {
    //         name: 'Bernard Arnault',
    //         net_worth: 76
    //     },
    //     {
    //         name: 'Bill Gates',
    //         net_worth: 96.5
    //     },
    //     {
    //         name: 'Carlos Sim Helu',
    //         net_worth: 64
    //     },
    //     {
    //         name: 'Jeff Bezos',
    //         net_worth: 131
    //     },
    //     {
    //         name: 'Larry Ellison',
    //         net_worth: 58
    //     },
    //     {
    //         name: 'Larry Page',
    //         net_worth: 50.8
    //     },
    //     {
    //         name: 'Mark Zuckerberg',
    //         net_worth: 62.3
    //     },
    //     {
    //         name: 'Michael Bloomberg',
    //         net_worth: 55.5
    //     },
    //     {
    //         name: 'Warren Buffet',
    //         net_worth: 82.5
    //     }
    // ];

    // const sortTypes = {
    //     up: {
    //         class: 'sort-up',
    //         fn: (a, b) => a.net_worth - b.net_worth
    //     },
    //     down: {
    //         class: 'sort-down',
    //         fn: (a, b) => b.net_worth - a.net_worth
    //     },
    //     default: {
    //         class: 'sort',
    //         fn: (a, b) => a
    //     }
    // };

    

	// method called every time the sort button is clicked
	// it will change the currentSort value to the next one
	// onSortChange = () => {
	// 	const { currentSort } = this.state;
	// 	let nextSort;

	// 	if (currentSort === 'down') nextSort = 'up';
	// 	else if (currentSort === 'up') nextSort = 'default';
	// 	else if (currentSort === 'default') nextSort = 'down';

	// 	this.setState({
	// 		currentSort: nextSort
	// 	});
	// };
    // return (
        // <div>
            /* <h2>Entries - 
                <select>
                    <option value = 'batch1'>Batch 1</option>
                    <option value = 'batch2'>Batch 2</option>
                    <option value = 'batch3'>Batch 3</option>
                </select>
            </h2>
            <p>Comprises of all that applied for batch 2</p>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>DOB-Age</th>
                    <th>Address</th>
                    <th>University</th>
                    <th>CGPA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ify Chinke</td>
                        <td>ify@enyata.com</td>
                        <td>12/09/17 - 27</td>
                        <td>3 Sabo Ave, Yaba, Lagos</td>
                        <td>University of Nigeria</td>
                        <td>5.0</td>
                    </tr>
                    <tr>
                        <td>Ify Chinke</td>
                        <td>ify@enyata.com</td>
                        <td>12/09/19 - 25</td>
                        <td>3 Sabo Ave, Yaba, Lagos</td>
                        <td>University of Nigeria</td>
                        <td>5.0</td>
                    </tr>
                    <tr>
                        <td>Ify Chinke</td>
                        <td>ify@enyata.com</td>
                        <td>12/09/18 - 26</td>
                        <td>3 Sabo Ave, Yaba, Lagos</td>
                        <td>University of Nigeria</td>
                        <td>5.0</td>
                    </tr>
                </tbody>
            </table> */
            // tableData.length > 0 && (
			// 	<table className='text-left'>
			// 		<thead>
			// 			<tr>
			// 				<th>Name</th>
			// 				<th>Net Worth</th>
			// 			</tr>
			// 		</thead>
			// 		<tbody>
			// 			{tableData.map(el => (
			// 				<tr>
			// 					<td>{el.name}</td>
			// 					<td>${el.net_worth}b</td>
			// 				</tr>
			// 			))}
			// 		</tbody>
			// 	</table>
			// )
        // </div>
    // )
}

export default ApplicationEntries