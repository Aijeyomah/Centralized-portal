const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const {
    hashPassword,
    isValidEmail,
    validatePassword,
    generateToken,
    comparePassword
} = require("../Validations/validations");
const {
    generateCode
} = require('../Validations/verifyAuth')
const sendMail = require('./emailSenderController')
const path = require('path')
const stream = require('stream')
const fs = require('fs')

exports.signUpUser = async (req, res, next) => {
    const date = new Date();
    const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const {
        first_name,
        last_name,
        email_address,
        phone_number,
        password,
        confirm_password
    } = req.body;
    if (!first_name || !last_name || !email_address || !phone_number || !password || !confirm_password) {
        return res.status(200).json({
            status: "failure",
            code: 200,
            message: "Please fill all fields"
        });
    }
    if (password !== confirm_password) {
        res.status(200).json({
            status: "failure",
            code: PASSWORD_MISMATCH,
            message: "This Password does not match"
        })
    }
    if (!isValidEmail(email_address)) {
        return res.status(200).json({
            status: 'failure',
            code: 200,
            message: "please put in a valid emailAddress"
        })
    }
    if (!validatePassword(password)) {
        return res.status(200).json({
            status: 'failure',
            code: 200,
            message: "Invalid Password"
        })
    }
    const hashedPassword = hashPassword(password)
    const is_admin = false;
    const queryObject = {
        text: queries.signUpUserQuery,
        values: [first_name, last_name, email_address, phone_number, hashedPassword, hashedPassword, created_at, created_at, is_admin]
    };
    const queryObject1 = {
        text: queries.findByEmail,
        values: [email_address]
    }
    try {
        const { rowCount } = await db.query(queryObject1);
        if (rowCount > 0) {
            res.status(400).send({
                message: "Email already exist"
            })
        }else{
                const { rows } = await db.query(queryObject);
                const dbresponse = rows[0];
                delete dbresponse.password
                delete dbresponse.confirm_password
                delete dbresponse.is_admin;
                delete dbresponse.created_at;
                delete dbresponse.updated_at;
                delete dbresponse.forgotpasswordcode;
                const tokens = generateToken(dbresponse.id, dbresponse.first_name, dbresponse.last_name, dbresponse.email_address, dbresponse.phone_number);
                const data = {
                    token: tokens,
                    dbresponse
                }
                res.status(201).json({
                    status: 'success',
                    code: 201,
                    message: "User Created Successfully",
                    data
                })
    }}
    catch (error) {
        res.status(500).json({

             status: 'error',
             code: 500,
             message: "Request Processing Error",
            // error: error.message
        })
}
}
exports.signInUser = async (req, res, next) => {
    const {
        email_address,
        password
    } = req.body
    if (!email_address || !password) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }
    if (!isValidEmail(email_address)) {
        return res.status(400).json({
            message: "Invalid email"
        })
    }
    if (!validatePassword(password)) {
        return res.status(400).json({
            message: "Invalid Password"
        })
    }
    const queryObject = {
        text: queries.signInUserQuery,
        values: [email_address]
    };

    try {
        const {
            rows,
            rowCount
        } = await db.query(queryObject);
        dbresponse = rows[0]
        if (!dbresponse) {
            return res.status(400).json({
                status: 'failure',
                code: 400,
                message: "invalid email"
            })
        }
        if (!comparePassword(dbresponse.password, password)) {
            return res.status(400).json({
                status: 'failure',
                code: 400,
                message: "invalid password"
            })
        }

        const tokens = generateToken(dbresponse.id, dbresponse.first_name, dbresponse.last_name, dbresponse.email_address, dbresponse.phone_number, dbresponse.is_admin);
        const data = {
            token: tokens
        }
        res.status(200).json({
            status: 'success',
            code: 200,
            message: "login Successfully",
            data
        })
        if (rowCount > 0) {
            const queryObject1 = {
                text: queries.saveSignInTokenQuery,
                values: [tokens, email_address]
            };
            const {
                rowCount
            } = await db.query(queryObject1)
            if (rowCount > 0) {
                res.status(200).send({
                    message: "token saved"
                })
            } else {
                res.status(500).send({
                    message: "Error saving forgot password code."
                })
            }
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



exports.forgotPassword = async (req, res) => {
    const {
        email_address
    } = req.body
    console.log(email_address)
    const queryObject = {
        text: queries.findByEmailAddress,
        values: [email_address]
    };
    try {
        const {
            rowCount,
            rows
        } = await db.query(queryObject);
        dbresponse = rows[0]
        if (rowCount > 0) {
            const date = new Date();
            const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');
            const code = generateCode(dbresponse.id, dbresponse.email_address, dbresponse.is_admin)
            const hostUrl2 = "http://boring-snyder-80af72.netlify.app/#"
            const email = req.body.email_address
            const subject = 'Forgot password '
            const text = `Follow this link to set your new password1 ${hostUrl2}/setnewpassword? please copy this code and insert it into the code input tag &code=${code}`;
            await sendMail(email, subject, text)
            const queryObject1 = {
                text: queries.saveForgetPasswordCodeQuery,
                values: [code, created_at, email_address]
            };
            const {
                rowCount
            } = await db.query(queryObject1)
            if (rowCount > 0) {
                res.status(200).send({
                    message: " Verification Email sent ",
                    code: code
                })
            } else {
                res.status(500).send({
                    message: "Error saving forgot password code."
                })
            }
        } else {
            res.status(400).send({
                message: "User does not exist"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })
    }
}
exports.setNewPassword = async (req, res) => {
    const {
        password,
        confirm_password,
        token
    } = req.body
    const code = token
    if (password !== confirm_password) {
        res.status(400).json({
            status: "failure",
            code: 400,
            message: "This Password does not match"
        })
    }
    const email_address = req.user.email_address
    const queryObject = {
        text: queries.findByEmailAddress,
        values: [email_address]
    };
    try {
        const {
            rowCount
        } = await db.query(queryObject);
        if (rowCount > 0) {
            const queryObject1 = {
                text: queries.findForgotPasswordCode,
                values: [code, email_address]
            };
            const {
                rowCount
            } = await db.query(queryObject1)
            if (rowCount > 0) {
                const hashedPassword = hashPassword(password)
                const queryObject2 = {
                    text: queries.updateNewPassword,
                    values: [hashedPassword, hashedPassword, email_address, code]
                };
                const {
                    rowCount,
                    rows
                } = await db.query(queryObject2);
                const dbresponse = rows[0];
                delete dbresponse.password
                delete dbresponse.confirm_password
                if (rowCount > 0) {
                    const queryObject3 = {
                        text: queries.clearPasswordCode,
                        values: ['', email_address]
                    };
                    const {
                        rowCount
                    } = await db.query(queryObject3);
                    if (rowCount > 0) {
                        res.status(200).send({
                            message: "Password updated"
                        })
                    } else {
                        res.status(500).send({
                            message: "Password forgot not updated"
                        })
                    }
                } else {
                    res.status(400).send({
                        message: "invalid code"
                    })
                }
            } else {
                res.status(400).send({
                    message: "User does not exist"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            code: 99,
            message: "Request Processing Error",
            error: error.message
        })
    }
}

exports.uploadProfilePics = async (req, res, next) => {
    const {
        id
    } = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer",
        });
    }

    const pics = req.files.pictures
    const picture_name = pics.name



    pics.mv(`./upload-profile ${picture_name}`), (err) => {
        if (err) {
            res.status(500).json({
                status: 'error',
                code: 99,
                message: "Error uploading picture",
                error: error.message
            })
        }
    }
    const queryObject1 = {
        text: queries.updateProfilePicture,
        values: [picture_name, id]
    };
    try {
        const {
            rows,
            rowCount
        } = await db.query(queryObject1)
        const dbresponse = rows[0]
        if (rowCount === 0) {
            return res.status(400).json({
                message: "Application process not completed"
            })
        }
        if (rowCount > 0) {
            res.status(201).json({
                message: "Application submitted ",
                dbresponse
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

exports.findSignInCode = async (req, res, next) => {
    const email_address = res.locals.user.email
    const queryObject = {
        text: queries.findSignInTokenQuery,
        values: [email_address]
    };
    try {
        const {
            rowCount,
            rows
        } = await db.query(queryObject)
        if (rowCount === 0) {
            return res.status(200).json({
                status: "failure",
                code: 400,
                message: "There is no user with this email"
            })
        }
        if (rowCount > 0) {
            if (rows[0].sign_in_token) {
                next();
            } else {
                return res.status(200).json({
                    status: "failure",
                    code: 400,
                    message: "you have been logged out"
                })
            }
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
exports.logOut = async (req, res) => {

    const email_address = res.locals.user.email
    const queryObject = {
        text: queries.findSignInTokenQuery,
        values: [email_address]
    };
    const queryObject1 = {
        text: queries.logOutQuery,
        values: [null, email_address]
    };
    try {
        const {
            rowCount
        } = await db.query(queryObject)
        if (rowCount === 0) {
            return Promise.reject({
                status: "failure",
                code: 400,
                message: "There is no user with this email"
            })
        }
        if (rowCount > 0) {
            const {
                rowCount,
                rows
            } = await db.query(queryObject1)
            if (rows[0].sign_in_token !== null) {
                return Promise.resolve({
                    message: "you are  logged in"
                })
            } else {
                return res.status(200).json({
                    status: "success",
                    code: 200,
                    message: "you are logged out"
                })
            }
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

exports.userDetail = async (req, res) => {

    const id = res.locals.user.id
    console.log(id)
    const queryObject = {
        text: queries.getUserdetail,
        values: [id]
    };
    console.log(queryObject)
    try {
        const { rows, rowCount } = await db.query(queryObject)
        if (rowCount > 0) {
          return res.status(200).json({ data: rows[0] })
        }
        if (rowCount === 0) {
          return res.status(400).json({ message: "id not found" })
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