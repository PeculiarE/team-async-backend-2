/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { generateUUID } from '../utils';
import db from '../db/setup';
import {
  getUserByEmail, insertNewUser, updateUser, getUserById,
  selectQuestionsByBatchId,
  getCurrentBatchUser, selectAllQuestionsInBatch, saveScore,
  updateUserPasswordByEmail, quizTimeForBatch, getTestScore,
} from '../db/queries/user';

export const getSingleUserByEmail = async (email) => db.manyOrNone(getUserByEmail, [email]);

export const checkCurrentBatchUser = async () => db.one(getCurrentBatchUser);

export const addNewUser = async (data) => {
  const userId = generateUUID();
  const batchId = await checkCurrentBatchUser();
  const {
    email, fullName, password, phone,
  } = data;
  return db.none(insertNewUser, [userId, batchId.max, fullName, email, phone, password]);
};

export const newApplication = async (userId, data) => {
  const applicationStatus = 'Yes';
  const {
    email, dob, age, address, university, course, cgpa, cv, photo,
  } = data;
  return db.one(updateUser, [
    email,
    dob,
    age,
    address,
    university,
    course,
    cgpa,
    cv,
    photo,
    applicationStatus,
    userId]);
};

export const getSingleUserById = async (userid) => db.oneOrNone(getUserById, [userid]);

export const updateUserPassword = async (data, email) => {
  const { password } = data;
  return db.one(updateUserPasswordByEmail, [password, email]);
};

export const getQuestions = async (batchId) => db.many(selectQuestionsByBatchId, [batchId]);

export const getQuestionsInDb = async (batchId) => db.many(selectAllQuestionsInBatch, [batchId]);

export const getBatchTime = async (batchId) => db.one(quizTimeForBatch, [batchId]);

export const inputTestScore = async (payload, userId) => {
  let count = 0;
  for (const item of payload.chosenAnswers) {
    const answer = payload.correctAnswers.find((el) => el.question_id === item.id);
    if (item.value === answer.correct_option) {
      count += 1;
      console.log(count);
    }
    console.log(count);
  }
  console.log(count);
  return db.one(saveScore, [count, userId]);
};

export const retrieveTestScore = async (userId) => db.one(getTestScore, [userId]);
