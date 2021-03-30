import { generateUUID } from '../utils';
import db from '../db/setup';
import {
  getUserByEmail, insertNewUser, updateUser, getUserById,
} from '../db/queries/user';

export const getSingleUserByEmail = async (email) => db.oneOrNone(getUserByEmail, [email]);

export const addNewUser = async (data) => {
  const id = generateUUID();
  const {
    email, fullName, password, phone,
  } = data;
  return db.none(insertNewUser, [id, fullName, email, phone, password]);
};

export const newApplication = async (userId, data) => {
  const batchId = generateUUID();
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
    batchId,
    userId]);
};

export const getSingleUserById = async (userid) => db.oneOrNone(getUserById, [userid]);
