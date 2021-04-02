import db from '../db/setup';
import {
  getAdminByEmail, insertNewApplication, getBatchId, getCurrentBatch, insertQuestions,
  insertAssessmentDetails, fetchAllUsers, updateUserStatusbyEmail, updateAdmin,
  insertAssessmentQuestions, getOneQuestion,
} from '../db/queries/admin';
import { generateUUID } from '../utils';

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

const checkCurrentBatch = async () => db.one(getCurrentBatch);

export const recordQuestion = async (data) => {
  const batchId = await checkCurrentBatch();
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
  } = data;
  const questionId = generateUUID();
  return db.none(insertAssessmentQuestions, [
    questionId,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctOption,
    batchId.max,
  ]);
};

export const getSingleQuestion = async (question) => db.oneOrNone(getOneQuestion, [question]);
export const addQuestions = async (adminId, data) => {
  const batchId = await checkCurrentBatch();
  const totalQuestions = data.shift();
  const extraDetails = data.splice(Math.max(data.length - 2, 0));
  data.forEach((el) => {
    const {
      questionId, question, optionA, optionB, optionC, optionD, ans,
    } = el;
    return db.none(insertQuestions, [
      questionId,
      batchId.max,
      adminId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      ans,
      totalQuestions,
      extraDetails[0],
    ]);
  });
  return db.none(insertAssessmentDetails, [
    batchId.max,
    extraDetails[1],
    totalQuestions,
    extraDetails[0],
  ]);
};

export const updateUserbyAdmin = async (data, email) => {
  const { applicationStatus } = data;
  return db.oneOrNone(updateUserStatusbyEmail, [applicationStatus, email]);
};

export const updateAdminDetails = async (adminId, data) => {
  const {
    fullName, email, phone, address, country, photo,
  } = data;
  db.none(updateAdmin, [
    fullName,
    email,
    phone,
    address,
    country,
    photo,
    adminId]);
};
