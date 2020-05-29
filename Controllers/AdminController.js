const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const { hashPassword, isValidEmail, validatePassword, generateToken, comparePassword } = require("../Validations/validations");
const { generateCode} = require('../Validations/verifyAuth')
const sendMail = require('./emailSenderController')
const path = require('path')
const stream = require('stream')
const fs = require('fs')

exports.createApplicationAdmin = async (req, res) => {
    const date = new Date();
    const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const { link, application_closure_date, batch_id, instructions } = req.body
    const files = req.files.file_upload
    fileName = files.name
    files.mv('uploadfile/' + fileName, (err) => {
        if (err) {
            console.log('Could Not Upload Image');
        }
        else {
            console.log(fileName)
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
        values: [fileName, link, application_closure_date, batch_id, instructions,created_at]
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
        console.log(error)
    }
}

exports.updateUserToAdmin = async (req, res)=>{
    const {id} =req.params
    const {is_admin}= req.body;
  
    if(is_admin === ''){
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
      const { rows,rowCount } = await db.query(queryObject);
     
      if(rowCount===0){
        res.status(400).json({
          message: "user not found",
        });
      }
      const queryObject1={
        text: queries.updateIsAdminType,
        values:[
          is_admin,
          id
        ]
      }
      const response = await db.query(queryObject1);
      const dbresult= response.rows[0];
    
      
      res.status(201).json({
        message: "admin updated Successfully",
        dbresult
      });
     
    } catch (error) {
      console.log(error);
      
    }
  
  }
  
  