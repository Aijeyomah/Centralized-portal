
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
    const date_of_application = moment(date).format('DD.MM.YY');
    const created_at = date.getFullYear();
    const d = new Date(req.body.date_of_birth)
    const birth = d.getFullYear()
    const age = created_at - birth
    const img = req.files.cv_file

    const status = 'Pending'

    images = img.name
    const { first_name, last_name, email_address, date_of_birth, address, university, course_of_study, cgpa } = req.body;
    const user_id = req.user.user_id
    if (email_address !== res.locals.user.email) {
        res.status(400).json({
            status: "failure",
            code: 400,
            message: "Mail must correspond with signup mail"
        })
    }
    img.mv('uploads/' + images, (error) => {
        if (error) {
            res.status(500).json({
                status: 'error',
                code: 99,
                message: "Error uploading file",
                error: error.message
            })
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
            message: "please put in a valid email address"
        })
    }
    const queryObject = {
        text: queries.RegisterApplicantQuery,
        values: [
            user_id,
            images,
            first_name,
            last_name,
            email_address,
            date_of_birth,
            address,
            university,
            course_of_study,
            cgpa,
            age,
            date_of_application,
            status,
            null
        ]
    };


    try {
        const { rows, rowCount } = await db.query(queryObject)
        const dbresponse = rows[0]
        if (rowCount === 0) {
            res.status(400).json({
                status: "failure",
                code: 400,
                message: "Application process not completed"
            })
        }
        if (rowCount > 0) {
            const email = req.body.email_address
            console.log(email)
            const subject = 'Application status'
            const text = 'Applcation have been'
            await sendMail(email, subject, text)
            res.status(201).json({
                status: "success",
                code: 201,
                message: "Application form submitted ", dbresponse
            })

        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })
    }

}
exports.applicantDetails = async (req, res) => {
    const user_id = req.user.user_id
    const queryObject = {
        text: queries.getUserDetailById,
        values: [user_id]
    };
    console.log(queryObject)
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: rows[0]
            })
        }
        if (rowCount === 0) {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "id not found"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })
    }
}


exports.getSubmittedApplicationByBatchID = async (req, res) => {
    const { batch } = req.params
    const queryObject = {
        text: queries.getApplicationByID,
        values: [batch]
    }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: rows[0]
            })
        }
        if (rowCount === 0) {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "there is no id found"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'failure',
            code: 500,
            message: "Request Processing Error",
            error: error.message
        })
    }
}

exports.getSubmittedAllApplication = async (req, res) => {
    const queryObject = {
        text: queries.getAllApplication
    }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: rows[0]
            })
        }
        if (rowCount === 0) {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "there is no id found"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })
    }
}

exports.getAllApplicationBatches = async (req, res) => {
    const queryObject = {
        text: queries.getAllApplicationBatchesQuery
    }
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: rows[0]
            })
        }
        if (rowCount === 0) {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "cannot get application batch"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: "Request Processing Error",
            error: error.message
        })
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
            return res.status(200).json({
                status: "success",
                code: 200,
                data: rows
            })
        }
        if (rowCount === 0) {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "there is no id found"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'failure',
            code: 500,
            message: "Request Processing Error",
            error: error.message
        })
    }
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
            return res.status(200).json({
                status: "success",
                code: 200,
                data: rows[0]
            })
        }
        if (rowCount === 0) {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "there is no id found"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })
    }
}
exports.updateTestScores = async (req, res) => {
    const { test_scores } = req.body
    const email_address = res.locals.user.email
    const queryObject = {
        text: queries.findByEmail,
        values: [email_address]
    };
    console.log(queryObject)
    const queryObject1 = {
        text: queries.testScoresQuery,
        values: [test_scores, email_address]
    };
    console.log(queryObject1)
    try {
        const { rowCount, rows } = await db.query(queryObject)
        if (rowCount === 0) {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "There is no user with this email"
            })
        }
        if (rowCount > 0 && rows[0].test_scores === null) {
            const { rowCount } = await db.query(queryObject1)
            if (rowCount === 0) {
                return res.status(400).json({
                    status: "failure",
                    code: 400,
                    message: "you are yet to take the test"
                })
            } else {
                return res.status(200).json({
                    status: 'success',
                    code: 200,
                    message: "your test scores has been updated"
                })
            }            
        } else {
            return res.status(400).json({
                status: "failure",
                code: 400,
                message: "your have taken this test"
            })
        }
    }
 catch (error) {
    console.log(error)
    return res.status(500).json({
        status: "failure",
        code: 500,
        message: error.message
    })
}
}

    
