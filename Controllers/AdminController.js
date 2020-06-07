const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const { hashPassword, isValidEmail, validatePassword, generateToken, comparePassword } = require("../Validations/validations");
const { generateCode } = require('../Validations/verifyAuth')
const sendMail = require('./emailSenderController')
const path = require('path')
const stream = require('stream')
const fs = require('fs')


exports.createApplicationAdmin = async (req, res) => {
  const date = new Date();
  const created_at = moment(date).format('YYYY-MM-DD');
  const updated_at= moment(date).format('HH:mm, YY/MM/DD')
  const { link, application_closure_date, batch_id, instructions } = req.body
  const files = req.files.file_upload
  console.log(req.files)
  fileName = files.name
  console.log()
  files.mv('uploadingfile/' + fileName), (error) => {
    if (error) {
      res.status(500).json({
        status: 'error',
        code: 99,
        message: "Request Processing Error",
        error: error.message
      })
    }
  }
 
    const total = 0;

  if (!link || !application_closure_date || !batch_id || !instructions) {
    return res.status(400).json({
      status: "failure",
      code: 400,
      message: "Please fill all fields",
    });
  }


  const queryObject = {
    text: queries.createApplicationAdminQuery,
    values: [fileName, link, application_closure_date, batch_id, instructions, created_at, total,updated_at]
  };
  try {
    const { rowCount, rows } = await db.query(queryObject)
    const dbresponse = rows[0]
    if (rowCount === 0) {
      res.status(400).json({
        status: "failure",
        code: 400,
        message: "Application not completed"
      })
    }
    if (rowCount > 0) {
      res.status(201).json({
        status: "success",
        code: 201,
        message: "Application submitted ", dbresponse
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


exports.composeAssessmentAdmin = async (req, res) => {
 
  const {batch_id} = req.body
  const y = req.body.questionStore;
  const ray = JSON.parse(y);

  for (let prop in ray) {
    queryObject = {
      text: queries.composeAssessmentQuery,
      values: [ray[prop].question, ray[prop].option_a, ray[prop].option_b, ray[prop].option_c, ray[prop].option_d, ray[prop].correct_answer, batch_id]
    };
    try {
      const { rows } = await db.query(queryObject)
      result = rows[0]
      res.status(201).json({
        status: 'success',
        code: 201,
        message: "assessment Created Successfully",
        result
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        code: 99,
        message: "Request Processing Error",
        error: error.message
      })
    }
  }
}

exports.getAllAssessmentUser = async (req, res) => {
  //const batch_id = req.params
  
  const queryObject = {
    text: queries.getAllAssessment,
    values: [batch_id]
  }
  try {
    const { rows, rowCount } = await db.query(queryObject)
    console.log(queryObject)
    console.log(rows)
      console.log(batch_id)
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
        message: "Assessment"
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

exports.uploadfileSetTime = async (req, res) => {
  const { set_time,no_of_question, batch_id } = req.body

  const date = new Date();
  const created_at = moment(date).format('YYYY/MM/DD ');
  const files = req.files.file_upload
  const status = 'Not Taken'
  console.log(req.body)
  fileName = files.name
  console.log(files)
  files.mv('uploadFile/' + fileName, (error) => {
    if (error) {
      res.status(500).json({
        status: 'error',
        code: 99,
        message: "Request Processing Error",
        error: error.message
      })
    }

  })
  const queryObject = {
    text: queries.uploadtime,
    values: [
      fileName,
      set_time,
      created_at,
      no_of_question, 
       batch_id, 
       status
    ]
  }
  console.log(queryObject)
  try {
    const { rowCount, rows } = await db.query(queryObject)
    const dbresponse = rows[0]
    console.log(dbresponse)
    if (rowCount === 0) {
      res.status(400).json({
        status: "failure",
        code: 400,
        message: "Time and file not uploaded"
      })
    }
    if (rowCount > 0) {
      res.status(201).json({
        status: "success",
        code: 400,
        message: "success uploading file ", dbresponse
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
exports.getAllComposedApplicationByBatch = async (req, res) => {
  const { batch_id } = req.params
  const queryObject = {
    text: queries.getAllComposedApplicationByBatchQuery,
    values: [batch_id]
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
      status: 'error',
      code: 99,
      message: "Request Processing Error",
      error: error.message
    })
  }
}
// getAllApplicant
// getAllApplicationSubmitted


exports.getAllFromApplication = async (req, res) => {
  const queryObject = {
    text: queries.getAllApplicationSubmitted
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
        message: "Assessment"
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

exports.getLastRowFromApplication = async (req, res) => {
  const queryObject = {
    text: queries.getLastCreateApplicationQuery
  }
  console.log(queryObject)
  try {
    const { rows, rowCount } = await db.query(queryObject)
    console.log(rows)
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
        message: "Assessment"
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

exports.getAllAssessmentByAdmin = async (req, res) => {
  const batch_id = req.body
  const queryObject = {
    text: queries.getAllAssessmentByBatch,
    values:[batch_id]
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
        message: "Assessment"
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