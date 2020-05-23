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

RegisterApplicantQuery:`
    INSERT INTO applicant(
        user_id,
        cv_file,
        first_name,
        last_name,
        email_address,
        date_of_birth,
        address,
        university,
        course_of_study,
        cgpa,
        created_at,
        updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
    `
}
module.exports = queries