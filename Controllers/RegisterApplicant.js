
const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const path = require('path')
const stream = require('stream')
const fs = require('fs')
const { isValidEmail } = require("../Validations/validations");




exports.createApplicationForm = async (req, res) => {
    const date = new Date();
    const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');

     const img = req.files.cv_file
   images = img.name
    const { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa, batch } = req.body;
    const user_id = req.user.user_id
    
    
    img.mv('uploads/'+images, (err) => {
        if (err) {
            console.log('Could Not Upload Image');
        }
        else{
            console.log(images)
        }
    })
    



    if (!first_name || !last_name || !email_address || !date_of_birth || !address || !university || !course_of_study || !cgpa||!batch) {
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
        values:   [
        user_id,
        images,
        first_name,
        last_name,
        email_address,
        date_of_birth ,
        address,
        university,
        course_of_study,
        cgpa,
         created_at,
        created_at ,
        batch
    ]
    };
 
    try {
        const { rows, rowCount } = await db.query(queryObject)
        const dbresponse = rows[0]
        if (rowCount === 0) {
            res.status(400).json({ message: "Application process not completed" })
        }
        if (rowCount > 0) {
            res.status(201).json({ message: "Application submitted ", dbresponse })
        }
    } catch (error) {
        res.status(500).json({ message: "error creating Application" })
    }

}

exports.getSubmittedApplicationByBatchID = async (req,res) =>{
    const {batch} = req.params


    const queryObject = {
        text: queries.getApplicationByID,
        values: [batch]
    }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({  data: rows[0] })
        }
        if (rowCount === 0) {
            return res.status(400).json({ message: "there is no id found" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "error finding id" })
    }
}

exports.getSubmittedAllApplication = async (req,res) =>{
const queryObject = {
        text: queries.getAllApplication
       }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({  data: rows[0] })
        }
        if (rowCount === 0) {
            return res.status(400).json({message: "there is no id found"})
        }
    }
    catch (error) {
        res.status(400).json({message: "Error getting application"})
    }
}

exports.getAllApplicationBatches = async (req, res) => {
    const queryObject = {
        text: queries.getAllApplicationBatchesQuery
    }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({ data: rows[0] })
        }
        if (rowCount === 0) {
            return res.status(400).json({ message: "there is no id found" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "error getting batches" })
    }
}

exports.getSubmittedApplicationEntriesByBatchID = async (req, res) => {
    const { batch } = req.params
    const queryObject = {
        text: queries.getAllApplicationEntries,
        values: [batch]
    }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({ data: rows[0] })
        }
        if (rowCount === 0) {
            return res.status(400).json({ message: "there is no id found" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error getting batches" })
    }
}








