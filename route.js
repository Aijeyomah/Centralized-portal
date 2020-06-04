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
    applicantDetails,
    updateTestScores
} = require('./Controllers/RegisterApplicant')
const {
    createApplicationAdmin,
    getAllComposedApplicationByBatch,
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
<<<<<<< HEAD
router.put('/uploadImage', verifyUserToken, uploadProfilePics)
=======
router.put('/uploadImage',verifyUserToken, uploadProfilePics)
>>>>>>> c1bce4f2d3f002a0f4eab300060bf5b172848940
router.post('/auth/createApplication', verifyAdminToken, createApplicationAdmin)
router.post('/auth/AdminlogOut', verifyAdminToken, logOut)
router.post('/auth/composeAssessmentAdmin', verifyAdminToken, findSignInCode, composeAssessmentAdmin)
router.post('/auth/uploadsetime', verifyAdminToken, uploadfileSetTime)

//put
router.put('/auth/logOut', verifyUserToken, logOut)
<<<<<<< HEAD
router.put('/auth/updatetestscores', verifyUserToken, findSignInCode, updateTestScores)
=======
router.put('/auth/updatetestscores',verifyUserToken,findSignInCode, updateTestScores)
>>>>>>> c1bce4f2d3f002a0f4eab300060bf5b172848940


//get
router.get('/getAllApplicationBatches', verifyAdminToken, findSignInCode, getAllApplicationBatches)
router.get('/getApplication', verifyAdminToken, findSignInCode, getSubmittedAllApplication)
router.get('/getApplicationByBatch/:batch', verifyAdminToken, findSignInCode, getSubmittedApplicationByBatchID)
router.get('/getApplicationEntriesByBatch/:batch', verifyAdminToken, findSignInCode, getSubmittedApplicationEntriesByBatchID)
router.get('/getassessment', verifyUserToken, findSignInCode, getAllAssessmentUser)
router.get('/getApplicationAdmin/:batch', verifyAdminToken, getApplicationByAdmin)
<<<<<<< HEAD
router.get('/getcomposedadminapplication/:batch_id', verifyAdminToken, findSignInCode, getAllComposedApplicationByBatch)
=======
router.get('/getcomposedadminapplication/:batch_id',verifyAdminToken,findSignInCode,getAllComposedApplicationByBatch )
>>>>>>> c1bce4f2d3f002a0f4eab300060bf5b172848940
router.get('/getuserDetail', verifyUserToken, userDetail)
router.get('/getapplicantdetail', verifyUserToken, applicantDetails)
router.get('/getadmindetail', verifyAdminToken, userDetail)

module.exports = router