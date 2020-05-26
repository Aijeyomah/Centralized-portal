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
        created_at,
        updated_at,
        batch
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *
    `,
  getApplicationByID: ` SELECT COUNT (*) FROM applicants where batch = ($1);`,
  getAllApplication: `SELECT COUNT (*) FROM applicants `,
  createApplicationAdminQuery:`
    INSERT INTO application(
        file_upload,
        link,
        application_closure_date,
        batch_id,
        instructions,
        created_at
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    findSignInTokenQuery:`
   SELECT * FROM users WHERE email_address=($1)`,
   saveSignInTokenQuery:`
    UPDATE users SET sign_in_token=($1) WHERE email_address=($2)`,
   logOutQuery:`
   UPDATE users SET sign_in_token=($1) WHERE email_address=($2) RETURNING *`,
   getAllApplicationBatchesQuery:`
   SELECT COUNT(*) FROM application  `,
   getAllApplicationEntries:` SELECT  * FROM applicants WHERE batch=($1)`

}
module.exports = queries



