export const getAdminByEmail = `
    select * from admin_table
    where email = $1;
`;

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
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    ans,
    total_questions,
    total_time) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    returning *;
`;
