const express = require("express");
const bodyParser = require("body-parser");
const route = require('./route')
const cors = require('cors')
const path = require("path")
const fs = require('fs')

const fileupload = require('express-fileupload')
 
let app = express();
 let port = process.env.PORT || 8000;

  
 
app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
 app.use(fileupload({
    //useTempFiles: true,
    // createParentPath: true,
    //safeFileNames: true,
    //preserveExtension: true
  }));
  
app.listen(port, ()=>{
    console.log("Application listening on port", port)
});

app.use("/api/v1", route);



module.exports = app