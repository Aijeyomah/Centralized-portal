import React, { useState } from 'react';
import './modal.css'
import closeBtn from '../../../Images/closeBtn.svg'

const Modal = ({ handleClose, show }) => {
    const [displaypicture, setDisplaypicture] = useState({ cv_file: '' });
    const handleFile = (e) => {
        let files = e.target.files[0]
        setDisplaypicture({
            ...displaypicture,
            cv_file: files,

        })
    }
    const { cv_file } = displaypicture;
    const userDetails = { cv_file };

    const handleSubmit = (e) => {
        e.preventDefault()
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (cv_file) {
            // axios.post('http://localhost:8000/api/v1/auth/Applicationform', userDetails, config)
            // .then(res => {
            // console.log(res)
            // }).catch(err => {
            // console.log(err)
            // })
        }
        console.log(cv_file)
        handleClose();
    }


    const style = {
        display: displaypicture.cv_file ? "block" : "none",
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "16px",
        color: "#5abefd",
        marginTop: 0,
        marginBottom: "7px",
        textAlign: "center"
    }

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2>Upload a profile picture</h2>
                <input type="file" name="file" id="file" className="modal_inputfile" onChange={handleFile} accept="image/png, image/jpeg" />
                <div style={style}>Upload successful!</div>
                <img className='close_icon' src={closeBtn} onClick={handleClose} />
                <button disabled={!cv_file} className='modal_button' onClick={handleSubmit}>Submit</button>
            </section>
        </div>
    );
}

export default Modal;