import db from '../db/setup';
import {
  getAdminByEmail, insertNewApplication, getBatchId, getCurrentBatch, insertQuestions,
  insertAssessmentDetails, fetchAllUsers, updateUserStatusbyEmail, updateAdmin,
  getOneQuestion, updateApprovalStatus, getAllApplicantsByBatchId,
  fetchAllApplicantsInBatch,
} from '../db/queries/admin';

export const getSingleAdminByEmail = async (email) => db.oneOrNone(getAdminByEmail, [email]);
export const getAllUsers = async () => db.manyOrNone(fetchAllUsers);

export const setNewApplication = async (data) => {
  const {
    batchId, design, applicationLink, closureDate, instructions,
  } = data;
  return db.none(insertNewApplication, [
    batchId, design, applicationLink, closureDate, instructions,
  ]);
};

export const checkBatchId = async (batchId) => db.oneOrNone(getBatchId, [batchId]);

export const checkCurrentBatch = async () => db.one(getCurrentBatch);

export const getSingleQuestion = async (question) => db.oneOrNone(getOneQuestion, [question]);

export const addQuestions = async (adminId, data) => {
  const batchId = await checkCurrentBatch();
  data.adminQuestions.forEach((el) => {
    const {
      questionNumber, question, optionA, optionB, optionC, optionD, file, correctOption,
    } = el;
    return db.none(insertQuestions, [
      questionNumber,
      batchId.max,
      adminId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      file,
      correctOption,
    ]);
  });
  const {
    dateOfExpiration, totalQuestions, totalTime,
  } = data.assessmentDetails;
  return db.none(insertAssessmentDetails, [
    batchId.max,
    dateOfExpiration,
    totalQuestions,
    totalTime,
  ]);
};

export const updateUserbyAdmin = async (data, email) => {
  const { applicationStatus } = data;
  return db.oneOrNone(updateUserStatusbyEmail, [applicationStatus, email]);
};

export const updateAdminDetails = async (admin, data) => {
  // eslint-disable-next-line no-param-reassign
  data.full_name = data.fullName;
  if (data.photo === null || data.photo === 'null') {
    // eslint-disable-next-line no-param-reassign
    data.photo_url = admin.photo_url;
  } else {
    // eslint-disable-next-line no-param-reassign
    data.photo_url = data.photo;
  }
  console.log(admin, data);
  const obj = { ...admin, ...data };
  return db.one(updateAdmin, [
    obj.full_name,
    obj.email,
    obj.phone,
    obj.address,
    obj.country,
    obj.photo_url,
    obj.admin_id]);
};

export const updateUserApprovalStatus = async (userId, data) => (
  db.none(updateApprovalStatus, [userId, data])
);

export const getEntriesSummary = async () => db.manyOrNone(getAllApplicantsByBatchId);

export const getUsersInBatch = async (batchId) => db.manyOrNone(fetchAllApplicantsInBatch,
  [batchId]);
