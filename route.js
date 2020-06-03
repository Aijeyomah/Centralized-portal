const express = require("express");
const router = express.Router();
const userController = require("./Controllers/usercontroller");
const {
    signUpUser,
    signInUser,
    setNewPassword,
    forgotPassword,
    uploadProfilePics,
    logOut,
    findSignInCode,
    userDetail
} = userController
const {
    verifyToken,
    verifyUserToken,
    verifyAdminToken
} = require("./Validations/verifyAuth");
const {
    createApplicationForm,
    getSubmittedAllApplication,
    getSubmittedApplicationByBatchID,
    getAllApplicationBatches,
    getSubmittedApplicationEntriesByBatchID,
    getApplicationByAdmin,
    applicantDetails
} = require('./Controllers/RegisterApplicant')
const {
    createApplicationAdmin,
    composeAssessmentAdmin,
    getAllAssessmentUser,
    uploadfileSetTime
} = require('./Controllers/AdminController')


//post

router.post('/auth/signup', signUpUser);
router.post('/auth/signin', signInUser);
router.post('/auth/signadmin', signInUser);
router.post('/auth/Applicationform', verifyUserToken, findSignInCode, createApplicationForm);
router.post('/auth/setnewpassword', verifyToken, setNewPassword)
router.post('/auth/forgotpassword', forgotPassword)
router.post('/uploadImage', uploadProfilePics)
router.post('/auth/createApplication', verifyAdminToken, createApplicationAdmin)
router.post('/auth/logOut', verifyUserToken, logOut)
router.post('/auth/AdminlogOut', verifyAdminToken, logOut)
router.post('/auth/composeAssessmentAdmin', verifyAdminToken, findSignInCode, composeAssessmentAdmin)
router.post('/auth/uploadsetime', verifyAdminToken, uploadfileSetTime)


//get
router.get('/getAllApplicationBatches', verifyAdminToken, findSignInCode, getAllApplicationBatches)
router.get('/getApplication', verifyAdminToken, findSignInCode, getSubmittedAllApplication)
router.get('/getApplicationByBatch/:batch', verifyAdminToken, findSignInCode, getSubmittedApplicationByBatchID)
router.get('/getApplicationEntriesByBatch/:batch', verifyAdminToken, findSignInCode, getSubmittedApplicationEntriesByBatchID)
router.get('/getassessment', verifyUserToken, findSignInCode, getAllAssessmentUser)
router.get('/getApplicationAdmin/:batch', verifyAdminToken, getApplicationByAdmin)
router.get('/getuserDetail', verifyUserToken, userDetail)
router.get('/getapplicantdetail', verifyUserToken, applicantDetails)
router.get('/getadmindetail', verifyAdminToken, userDetail)

module.exports = router