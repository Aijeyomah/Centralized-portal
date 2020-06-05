const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config()

const generateCode = (id, email_address, is_admin) => {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ id, email_address, is_admin }, key, { expiresIn: '1h' });
    return token;
  }
  const verifyToken = async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
      return res.status(403).json({
        status: "failure",
        code: 403,
        message: "token is not provided"
      })
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded
      console.log(decoded.is_admin)
      if (decoded.is_admin !== false) {
          return res.status(400).json({
            status: 'failure',
            code: 400,
            message: "You are not Authorised to Perform this Operation"
          })
      } else{
        next()
      }
    } catch (error) {
      return res.status(401).json({
        status: 'failure',
        code: 400,
        message: error.message
      })
    }
  }

  const verifyAdminToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).send("token is not provided")
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user={
        email: decoded.email_address,
        id: decoded.id,
        user_id: decoded.user_id
      }
      res.locals.user = req.user
      if (decoded.is_admin === false) {
        return res.status(403).json({ message: "You are not an admin" })
      }
      next();
    } catch (error) {
      console.log(error)
      return res.status(400).send("Authentication Failed")
    }
  }
const verifyUserToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(403).json({ message: "input a token" })
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    req.user={
      email: decoded.email_address,
      id: decoded.id,
      user_id : decoded.user_id
    }
    res.locals.user = req.user
      if (decoded.is_admin !== false) {
      return res.status(400).json({ message: "You are unauthorized user" })
    }
    next();
  } catch (error) {
    return res.status(400).send("Authentication Failed")
  }
}

module.exports = {
    verifyToken,
    verifyUserToken,
    verifyAdminToken, 
    generateCode
}