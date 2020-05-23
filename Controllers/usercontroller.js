const moment = require("moment");
const queries = require("../query");
const db = require("../database");
const { hashPassword, isValidEmail, validatePassword,generateToken,comparePassword } = require("../Validations/validations");

exports.signUpUser = async (req, res, next) => {
    const date = new Date();
    const created_at = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const { first_name, last_name, email_address, phone_number, password, confirm_password } = req.body;
    if (!first_name || !last_name || !email_address || !phone_number || !password || !confirm_password) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }
    if(password !==confirm_password){
        res.status(400).json({
            status: "failure",
            code: 400,
            message: "This Password does not match"
          })
    }
    if (!isValidEmail(email_address)) {
        return res.status(400).json({
            status: 'failure',
            code: 400,
            message: "please put in a valid emailAddress"
        })   
    }
    if (!validatePassword(password)) {
        return res.status(400).json({
            status: 'failure',
            code: 400,
            message: "Invalid Password"
        })
    }
    const hashedPassword = hashPassword(password)
    const is_admin = 0;
    const queryObject = {
        text: queries.signUpUserQuery,
        values: [first_name, last_name, email_address, phone_number, hashedPassword, hashedPassword,created_at, created_at, is_admin]
    };
    try {
        const { rows } = await db.query(queryObject);
        const dbresponse = rows[0];
        delete dbresponse.password
        delete dbresponse.confirm_password
        delete dbresponse.is_admin;
        delete dbresponse.created_at;
        delete dbresponse.updated_at;
        const tokens = generateToken(dbresponse.id, dbresponse.first_name, dbresponse.last_name, dbresponse.email_address, dbresponse.phone_number);
        const data = {
            token: tokens,
            dbresponse
        }
        res.status(201).json({
            status: 'success',
            code: 201,
            message: "User Created Successfully", data
        })
    } catch (error) {
        console.log(error);
    }
}
exports.signInUser = async (req, res, next) => {
    const { email_address, password } = req.body
    if (!email_address || !password) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }
    if (!isValidEmail(email_address)) {
        return res.status(400).json({
            message: "please put in a valid email"
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
        const { rows } = await db.query(queryObject);
        dbresponse = rows[0]
        if (!dbresponse) {
            return res.status(400).json({
                status: 'failure',
                code: 400,
                message: "no user with this email found"
            })
        }
        if (!comparePassword(dbresponse.password, password)) {
            return res.status(400).json({
                status: 'failure',
                code: 400,
                message: "The Password is incorrect"
            })
        }

        const tokens = generateToken(dbresponse.id, dbresponse.first_name, dbresponse.last_name, dbresponse.email_address, dbresponse.phone_number, dbresponse.is_admin);
        const data = {
            token: tokens
        }
        res.status(200).json({
            status: 'success',
            code: 200,
            message: "sign in Successfully", data
        })
    } catch (error) {
        next(error);
    }
}