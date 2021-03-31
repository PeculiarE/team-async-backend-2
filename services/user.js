import { generateUUID } from '../utils';
import db from '../db/setup';
import {
  getUserByEmail,
  insertNewUser, updateUser, getUserById, selectQuestionsByBatchId, getCurrentBatchUser,
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
  db.none(updateUser, [
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

export const getQuestions = async (batchId) => db.many(selectQuestionsByBatchId, [batchId]);
