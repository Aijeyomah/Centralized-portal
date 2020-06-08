const queries = {
    signUpUserQuery:`
    INSERT INTO users(
        first_name,
        last_name,
        email_address,
        phone_number,
        password,
        confirm_password,
        created_at,
        updated_at,
        is_admin
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `,
    getUserdetail: `SELECT * FROM users WHERE id=($1) `,
    signInUserQuery: `
    SELECT * FROM users WHERE email_address=($1)`,
    findByEmailAddress: `
  SELECT * FROM users WHERE email_address=($1)
  `,
  findUser:`SELECT * FROM users WHERE id =($1)`,
  updateIsAdminType:` UPDATE users SET is_admin=($1) WHERE id=($2)`,
  saveForgetPasswordCodeQuery:`
   UPDATE users SET forgotPasswordCode=($1), code_creation_date=($2) WHERE email_address=($3)`,
   findForgotPasswordCode:`
   SELECT * FROM users where forgotpasswordcode=($1) and email_address=($2)`,
   updateNewPassword:`
   UPDATE users SET password=($1), confirm_password=($2) WHERE email_address=($3) AND forgotpasswordcode=($4) RETURNING * `,
   clearPasswordCode:`
   UPDATE users SET forgotpasswordcode=($1) WHERE email_address=($2) `,
   findAUsersById: `
   SELECT * FROM users WHERE id=($1)
 `,
   updateProfilePicture:`
   UPDATE users SET pictures=($1) WHERE id=($2)
   `,
   findByEmail:`SELECT * FROM users WHERE email_address = ($1)`,

    RegisterApplicantQuery:`
    INSERT INTO applicants(
        user_id,
        cv_file,
        first_name,
        last_name,
        email_address,
        date_of_birth ,
        address,
        university,
        course_of_study,
        cgpa, 
        age,
        created_at,
        status,
        test_scores
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14) RETURNING *
    `,
    getUserDetailById:`SELECT * FROM applicants WHERE user_id =($1)`,
  getAllApplicant:`SELECT * FROM applicants`,
  getApplicationByID: ` SELECT COUNT (*) FROM applicants where batch = ($1);`,
  getAllApplication: `SELECT COUNT (*) FROM applicants `,
  getAllComposedApplicationByBatchQuery:`SELECT * FROM application WHERE batch_id=($1)`,
  createApplicationAdminQuery:`
    INSERT INTO application(
        file_upload,
        link,
        application_closure_date,
        batch_id,
        instructions,
        created_at,
        total,
        updated_at
      
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    getAllApplicationSubmitted:`SELECT * FROM application`,
    findSignInTokenQuery:`
   SELECT * FROM users WHERE email_address=($1)`,
   saveSignInTokenQuery:`
    UPDATE users SET sign_in_token=($1) WHERE email_address=($2)`,
   logOutQuery:`
   UPDATE users SET sign_in_token=($1) WHERE email_address=($2) RETURNING *`,
   getAllApplicationBatchesQuery:`
   SELECT COUNT(*) FROM application  `,
   findScore:`
   SELECT * FROM applicants WHERE score=($1)`,
   getAllsubmittedApplication:`
   SELECT * FROM applicants WHERE batch=($1)`,
   findApplicationTotalById:` SELECT total FROM application WHERE batch_id=($1)`
 ,
   composeAssessmentQuery:`
    INSERT INTO assessment(
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        batch_id
  ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
   getAllApplicationEntries:` SELECT  * FROM applicants WHERE batch=($1)`,
   getAllAssessment:` SELECT  * FROM assessment ORDER BY random()`,
   getAllAssessmentByBatch:`  SELECT * FROM assessment WHERE batch_id=($1) `,

   uploadtime:`
   INSERT INTO filetime(
    file_upload,
    set_time,
    created_at,
    no_of_question, 
    batch_id,
    assessment_status
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
   `,
   AdminUpdateAssessmentQuery:`UPDATE filetime SET assessment_status=($1) WHERE batch_id=($2) RETURNING *`,
   testScoresQuery:`UPDATE applicants SET test_scores=($1) WHERE email_address=($2) RETURNING *` ,
   updateAssessmentStatusQuery:`UPDATE applicants SET status=($1) WHERE email_address=($2) RETURNING *`,
   getLastCreateApplicationQuery:`SELECT * FROM application ORDER BY id DESC LIMIT 1`,
   getfiletimeQuery:`SELECT * FROM filetime `,
   getAllAssessmentByAdmin:`SELECT * FROM assessment WHERE batch_id=($1)`
}
module.exports = queries



