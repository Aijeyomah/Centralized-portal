const express = require("express");
const bodyParser = require("body-parser");
const route = require('./route')
//const cors = require('cors')
const path = require("path")
const fs = require('fs')
const fileupload = require('express-fileupload')
 
let app = express();
 let port = process.env.PORT || 8000;

 
 app.use(bodyParser.json({limit: '10mb', extended: true}))
 app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
 
//app.use(cors());


app.use(fileupload())
app.use(express.static(path.join(__dirname, 'upload-profile')));

  
app.listen(port, ()=>{
    console.log("Application listening on port", port)
});

app.use("/api/v1", route);



module.exports = app