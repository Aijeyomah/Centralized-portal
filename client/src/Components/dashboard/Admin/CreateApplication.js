import React, { useState } from 'react';
import uploadIcon from '../../../Images/upload-icon.svg';
import './createApplication.css'

const CreateApplication = () => {
    const [state, setState] = useState({
        link: "",
        batch_id: "",
        instructions: "",
        closure_date: "",
        file: ""
    })

    const handleChange = e => {
        setState({
            ...state, 
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { link, batch_id, instructions, closure_date, file } = state
        let applicationDetails = { link, batch_id, instructions, closure_date, file }
        console.log(applicationDetails);
    }

        const handleFile = (e) => {
            let files = e.target.files
            let reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = (e) => {
                let result = e.target.result
                setState({
                    ...state, 
                    file: result
                })
            }
        }

        const style = {
            display: state.file ? "block" : "none",
            fontWeight: 500,
            fontSize: "16px",
            color: "#5abefd",
            margin: "7px 0",
            textAlign: "center",
            width: '370px'
        }

       

    return (
        <div className="application-wrapper">
            <div>
                <h2>Create Application</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="application-first-row">
                    <div className="application-file-container">
                    <div><img className="upload-icon" src={uploadIcon} alt="Upload icon" /></div>
                        <input type="file" name="file" id="file" className="application-input-file" onChange={handleFile} />
                        <label htmlFor="file">Upload CV</label>
                    </div>
                    
                    <div>
                        <label>Link</label>
                        <br />
                        <input id="link" type="text" onChange={handleChange} required /><br />
                    </div>
                </div>
                <div style={style}>Upload successful!</div>
                <div className="application-second-row">
                    <div>
                        <label>Application closure date</label>
                        <br />
                        <input id="closure_date" type="text" placeholder="dd-mm-yyyy" required
                            pattern="([12][0-9]|3[01]|0?[1-9])-(0?[1-9]|1[012])-((?:19|20)\d\d)" onChange={handleChange} /><br />
                    </div>
                    <div>
                        <label>Batch Id</label>
                        <br />
                        <input id="batch_id" type="number" onChange={handleChange} required /><br />
                    </div>
                </div>
                <div className="application-third-row">
                    <div>
                        <label>Instructions</label>
                        <br />
                        <textarea id="instructions" type="text" onChange={handleChange} required /><br />
                    </div>
                </div>
                <button className='applicationBtn' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateApplication