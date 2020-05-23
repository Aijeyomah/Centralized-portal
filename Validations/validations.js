const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");

dotenv.config();


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password) => {
  if (password.length <= 5) {
    return false;
  } return true;
};

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
  };
  const generateToken = (id, first_name, last_name, email_address, phone_number, is_admin) => {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ id, email_address, first_name, last_name, phone_number, is_admin}, key, { expiresIn: '1h' });
    return token;
  }
  module.exports = {
    hashPassword,
    isValidEmail,
    validatePassword,
    comparePassword,
    generateToken
  }