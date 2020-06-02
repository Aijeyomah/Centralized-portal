const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const { hashPassword, isValidEmail, validatePassword, generateToken, comparePassword } = require("../Validations/validations");
const { generateCode } = require('../Validations/verifyAuth')
const sendMail = require('./emailSenderController')
const path = require('path')
const stream = require('stream')
const fs = require('fs')


exports.updateUserBySuperAdmin = async (req, res, next) => {
  const { id } = req.params

  const { is_admin } = req.body
  const queryObject = {
    text: queries.updateIsAdminType,
    values: [is_admin, id]
  }

  try {
    const { rowCount } = await db.query(queryObject)
    if (rowCount === 0) {
      return res.status(400).json({
        status: 'failure',
        code: 400,
        message: "user id not found"
      })
    }
    if (rowCount > 0) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: "user admin type updated successfully"
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      code: 400,
      message: error.message
    })
  }
}


exports.createApplicationAdmin = async (req, res) => {
  const date = new Date();
  const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');
  const { link, application_closure_date, batch_id, instructions } = req.body
  const files = req.files.file_upload
  console.log(req.files)
  fileName = files.name
  console.log()
  files.mv('uploadingfile/' + fileName, (error) => {
    if (error) {
      res.status(500).json({
        status: 'error',
        code: 99,
        message: "Request Processing Error",
        error: error.message
      })
    }
  })
  if (!link || !application_closure_date || !batch_id || !instructions) {
    return res.status(400).json({
      status: "failure",
      code: 400,
      message: "Please fill all fields",
    });
  }
  const queryObject = {
    text: queries.createApplicationAdminQuery,
    values: [fileName, link, application_closure_date, batch_id, instructions, created_at]
  };
  try {
    const { rowCount, rows } = await db.query(queryObject)
    const dbresponse = rows[0]
    if (rowCount === 0) {
      res.status(400).json({ message: "Application not completed" })
    }
    if (rowCount > 0) {
      res.status(201).json({ message: "Application submitted ", dbresponse })
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



exports.updateUserToAdmin = async (req, res) => {
  const { id } = req.params
  const { is_admin } = req.body;

  if (is_admin === '') {
    return res.status(400).json({
      message: "Admin status is needed",
    })
  }
  const queryObject = {
    text: queries.findUser,
    values: [
      id
    ]
  };
  try {
    const { rows, rowCount } = await db.query(queryObject);

    if (rowCount === 0) {
      res.status(400).json({
        message: "user not found",
      });
    }
    const queryObject1 = {
      text: queries.updateIsAdminType,
      values: [
        is_admin,
        id
      ]
    }
    const response = await db.query(queryObject1);
    const dbresult = response.rows[0];


    res.status(201).json({
      message: "admin updated Successfully",
      dbresult
    });

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
  const files = req.files.file_upload
  fileName = files.name
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
  const { batch_id, set_time } = req.body
  const date = new Date();
  const created_at = moment(date).format('YYYY-MM-DD');
  const y = req.body.question;
  console.log("here: " + y)
  const ray = JSON.parse(y);
  console.log("ray here: " + ray)

  for (let prop in ray) {
    queryObject = {
      text: queries.composeAssessmentQuery,
      values: [fileName, set_time, ray[prop].question, ray[prop].option_a, ray[prop].option_b, ray[prop].option_c, ray[prop].option_d, ray[prop].correct_answer, created_at, batch_id]
    };
    try {
      const { rowCount, rows } = await db.query(queryObject)
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

  exports.composeAssessmentAdmin = async (req, res) => {
    
    const{ batch_id} = req.body
    const date = new Date();
    const created_at = moment(date).format('YYYY-MM-DD');
    const y = req.body.question;
    console.log("here: "+y)
    const ray=JSON.parse(y);
    console.log("ray here: "+ray)

    for (let prop in ray) {
        queryObject = {
            text: queries.composeAssessmentQuery,
            values: [ray[prop].question, ray[prop].option_a, ray[prop].option_b, ray[prop].option_c, ray[prop].option_d, ray[prop].correct_answer,created_at, batch_id]
             };
             try {
                const{rowCount,rows}= await db.query(queryObject)
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
        const queryObject = {
            text: queries.getAllAssessment
        }
        try {
            const { rows, rowCount } = await db.query(queryObject)
            if (rowCount > 0) {
                return res.status(200).json({ data: rows })
            }
            if (rowCount === 0) {
                return res.status(400).json({ message: "Assessment" })
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

    exports.uploadfileSetTime = async (req, res)=>{
      const files = req.files.file_upload
    fileName = files.name
    files.mv('uploadFile/' + fileName, (error) => {
        if (error) {
          res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        }) }
       
})
    const {set_time }= req.body
    const queryObject={
      text: queries.uploadtime,
      values:[
        file_upload,
        set_time
      ]
    }

    try {
      const { rowCount, rows } = await db.query(queryObject)
      const dbresponse = rows[0]
      if (rowCount === 0) {
          res.status(400).json({ message: "Time and file not uploaded" })
      }
      if (rowCount > 0) {
          res.status(201).json({ message: "success uploading file ", dbresponse })
      }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 99,
      message: "Request Processing Error",
      error: error.message
  })    }
    
    }
    
  
  
