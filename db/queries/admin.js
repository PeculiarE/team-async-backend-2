export const getAdminByEmail = `
    select * from admin_table
    where email = $1;
`;
export const fetchAllUsers = `
 select * from user_table
 ;`;

export const updateUserStatusbyEmail = `
 update user_table
 set
 application_status = $1,
 updated_at = now()
 where email = $2
 returning *;`;

export const insertNewApplication = `insert into application_info (
    batch_id,
    design_url,
    application_link,
    closure_date,
    instructions) values ($1, $2, $3, $4, $5);
`;

export const getBatchId = `
    select * from application_info
    where batch_id = $1;
`;

export const getCurrentBatch = `
select max(batch_id) from application_info;
`;

export const insertQuestions = `insert into assessment_questions (
    question_id,
    batch_id,
    admin_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    ans,
    total_questions,
    total_time) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
`;

export const insertAssessmentDetails = `insert into assessment_details (
    batch_id,
    date_of_expiration,
    total_questions,
    total_time) values ($1, $2, $3, $4);
`;

export const updateAdmin = `
    UPDATE admin_table
    SET
    full_name = $1,
    email = $2,
    phone = $3,
    address = $4,
    country = $5,
    photo_url = $6,
    updated_at = NOW() WHERE admin_id = $7;`;
