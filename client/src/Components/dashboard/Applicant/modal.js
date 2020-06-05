import React, { useState } from 'react';
import './modal.css'
import closeBtn from '../../../Images/closeBtn.svg'
import axios from 'axios'
import useSpinner from './../../../Spinner/useSpinner';

const Modal = ({ handleClose, show }) => {
    const [spinner, showSpinner, hideSpinner] = useSpinner()
    const [displaypicture, setDisplaypicture] = useState({ pictures: '' });
    const handleFile = (e) => {
        let files = e.target.files[0]
        setDisplaypicture({
            ...displaypicture,
            pictures: files,
        })
    }

    const { pictures } = displaypicture;

    const handleSubmit = (e) => {
        e.preventDefault()
        showSpinner()
        const userDetails = { pictures };
        let pics = pictures
        if (pictures) {
            const token = localStorage.getItem('token')
            var formData = new FormData()

            for (var key in userDetails) {
                formData.append(key, userDetails[key])
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }

            }
            axios.put('/api/v1/uploadImage', formData, config)
                .then(res => {
                    console.log(res)
                    hideSpinner()
                }).catch(err => {
                    console.log(err)
                })
        }
        console.log(pictures)
        handleClose();
    }


    const style = {
        display: displaypicture.pictures ? "block" : "none",
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "16px",
        color: "#5abefd",
        marginTop: 0,
        marginBottom: "7px",
        textAlign: "center"
    }

    const handleImage = () => {

    }

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h2>Upload a profile picture</h2>
                <input type="file" name="file" id="file" className="modal_inputfile" onChange={handleFile} accept="image/png, image/jpeg" />
                <div style={style}>Upload successful!</div>
                <img className='close_icon' src={closeBtn} onClick={handleClose} />
                <button disabled={!pictures} className='modal_button' onClick={handleSubmit}>Submit</button>
            </section>
            {spinner}
        </div>
    );
}

export default Modal;