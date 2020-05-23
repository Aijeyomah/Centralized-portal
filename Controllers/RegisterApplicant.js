const moment = require("moment");
const queries = require("../query");
const db = require("../database");
var multer = require('multer')
const path = require('path')
const stream = require('stream')
const fs = require('fs')
const { isValidEmail } = require("../Validations/validations");




exports.createApplication = async (req, res) => {
    const date = new Date();
    const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');

    const img = req.files.cv_file.name
    const {  first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa } = req.body;
    const user_id = req.user.user_id
    //console.log(req.body)
    //:\Users\aijey\Documents\GitHub\Centralized-portal\uploads
  

    img.split(' ').join('');
    img.mv(`./uploads/${img}`, (err) => {
        if (err) {
            console.log('Could Not Upload Image');
        }
        else{
            console.log("file uploaded")
        }
    })



    if (!first_name || !last_name || !email_address || !date_of_birth || !address || !university || !course_of_study || !cgpa) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }
    if (!isValidEmail(email_address)) {
        return res.status(400).json({
            status: 'failure',
            code: 400,
            message: "please put in a valid emailAddress"
        })
    }
    const queryObject = {
        text: queries.RegisterApplicantQuery,
        values: [user_id,img, first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa, created_at, created_at]
    };
    try {
        const { rows, rowCount } = await db.query(queryObject)

        if (!upload) {
            return res.status(400).json({ message: "Error uploading file." });
        }
        const dbresponse = rows[0]
        if (rowCount === 0) {
            res.status(400).json({ message: "Application process not completed" })
        }
        if (rowCount > 0) {
            res.status(201).json({ message: "Application submitted ", dbresponse })
        }
    } catch (error) {
        res.status(500).json({ message: "error creating creating application" })
    }

}

