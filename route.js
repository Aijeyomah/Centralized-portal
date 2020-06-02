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
    findSignInCode
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
    getApplicationByAdmin
} = require('./Controllers/RegisterApplicant')
const {
    createApplicationAdmin,
    composeAssessmentAdmin,
    getAllAssessmentUser,
    updateUserBySuperAdmin,
    uploadfileSetTime
} = require('./Controllers/AdminController')


//post

router.post('/auth/signup', signUpUser);
router.post('/auth/signin', signInUser);
router.post('/auth/signadmin', signInUser);
router.post('/auth/Applicationform', verifyUserToken, findSignInCode, createApplicationForm);
router.post('/auth/setnewpassword', verifyToken, setNewPassword)
router.post('/auth/forgotpassword', forgotPassword)
router.post('/uploadImage/:id', uploadProfilePics)
router.post('/auth/createApplication', verifyAdminToken, createApplicationAdmin)
router.post('/auth/logOut', verifyUserToken, logOut)
router.post('/auth/AdminlogOut', verifyAdminToken, logOut)
router.post('/auth/composeAssessmentAdmin', verifyAdminToken, findSignInCode, composeAssessmentAdmin)
router.post('/auth/composeAssessmentAdmin', verifyAdminToken, uploadfileSetTime)

router.put('/updateadmin/:id',  updateUserBySuperAdmin)



//get
router.get('/getAllApplicationBatches', verifyAdminToken, findSignInCode, getAllApplicationBatches)
router.get('/getApplication', verifyAdminToken, findSignInCode, getSubmittedAllApplication)
router.get('/getApplicationByBatch/:batch', verifyAdminToken, findSignInCode, getSubmittedApplicationByBatchID)
router.get('/getApplicationEntriesByBatch/:batch', verifyAdminToken, findSignInCode, getSubmittedApplicationEntriesByBatchID)
router.get('/getassessment', getAllAssessmentUser)
router.get('/getApplicationAdmin/:batch', verifyAdminToken, getApplicationByAdmin)

module.exports = router