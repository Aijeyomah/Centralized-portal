
const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const path = require('path')
const stream = require('stream')
const fs = require('fs')
const { isValidEmail } = require("../Validations/validations");
const sendMail = require('./emailSenderController')




exports.createApplicationForm = async (req, res) => {
   const date = new Date();
   const date_of_application =  moment(date).format('DD.MM.YY');
    const created_at = date.getFullYear();
    const d = new Date(req.body.date_of_birth)
    const birth = d.getFullYear()
    const age = created_at - birth
    const img = req.files.cv_file
    const status = 'pending'
    
   images = img.name
    const { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa} = req.body;
    const user_id = req.user.user_id
    if(email_address !==  res.locals.user.email){
        res.status(200).json({
            status: 'error',
            message: "Mail must correspond with signup mail"
        })    
    }
    img.mv('uploads/'+images, (error) => {
        if (error) {
            res.status(500).json({
                status: 'error',
                code: 99,
                message: "Error uploading file",
                error: error.message
            })        }
      
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
            message: "please put in a valid email address"
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
        age,
        date_of_application,
        status
    ]
    };
  
 
    try {
        const { rows, rowCount } = await db.query(queryObject)
        const dbresponse = rows[0]
        if (rowCount === 0) {
            res.status(400).json({ message: "Application process not completed" })
        }
        if (rowCount > 0) {
        const email = req.body.email_address
         console.log(email)
        const subject = 'Application status'
        const text = 'Applcation have been'
        await sendMail(email,  subject, text )
         res.status(201).json({ message: "Application submitted ", dbresponse })

        }
        
        
       
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })    }

}
exports.checkIfEmailExist= async(req,res, next)=>{

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
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })    }
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
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })    }
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
            return res.status(400).json({ message: "cannot get application batch" })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })    }
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
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })    }
}



exports.createApplicationForm1 = async (req, res) => {
    const date = new Date();
    const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');

     const img = req.files.cv_file
   images = img.name
    const { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa, batch } = req.body;
    
    
    img.mv('uploads/'+images, (error) => {
        if (error) {
            res.status(500).json({
                status: 'error',
                code: 99,
                message: "Request Processing Error",
                error: error.message
            })        }
    
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
}
 
exports.getApplicationByAdmin = async (req, res) => {
    const { batch } = req.params
    const queryObject = {
        text: queries.getAllsubmittedApplication,
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
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })    }
}

