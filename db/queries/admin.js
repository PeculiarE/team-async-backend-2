export const getAdminByEmail = `
    select * from admin_table
    where email = $1;
`;

export const insertNewApplication = `insert into application_info (
    batch_id,
    application_link,
    closure_date,
    instructions) values ($1, $2, $3, $4);
`;

export const getBatchId = `
    select * from application_info
    where batch_id = $1;
`;
