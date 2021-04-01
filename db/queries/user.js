export const getCurrentBatchUser = `
select max(batch_id) from application_info;
`;

export const updateUser = `
    UPDATE user_table
    SET
    email = $1,
    dob = $2,
    age = $3,
    address = $4,
    university = $5,
    course = $6,
    cgpa = $7,
    cv_url = $8,
    photo_url = $9,
    application_status = $10,
    updated_at = NOW() WHERE user_id = $11
    returning *`;

export const insertNewUser = `insert into user_table (
    user_id,
    batch_id,
    full_name,
    email,
    phone,
    password) values ($1, $2, $3, $4, $5, $6);
`;

export const getUserByEmail = `
    select * from user_table
    where email = $1;
`;

export const getUserById = `
    select * from user_table
    where user_id = $1;
`;

export const updateUserPasswordById = `
update user_table
set 
  password = $1,
  updated_at = NOW()
where email = $2
returning *;`;

export const selectQuestionsByBatchId = `
    select * from assessment_questions
    where batch_id = $1;
`;
