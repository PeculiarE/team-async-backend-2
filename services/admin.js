import db from '../db/setup';
import {
  getAdminByEmail, insertNewApplication, getBatchId, getCurrentBatch, insertQuestions,
} from '../db/queries/admin';

export const getSingleAdminByEmail = async (email) => db.oneOrNone(getAdminByEmail, [email]);

export const setNewApplication = async (data) => {
  const {
    batchId, applicationLink, closureDate, instructions,
  } = data;
  return db.none(insertNewApplication, [batchId, applicationLink, closureDate, instructions]);
};

export const checkBatchId = async (batchId) => db.oneOrNone(getBatchId, [batchId]);

const checkCurrentBatch = async () => db.one(getCurrentBatch);

export const addQuestions = async (data) => {
  const batchId = await checkCurrentBatch();
  const {
    questionId, question, optionA, optionB, optionC, optionD, ans, totalQuestions, totalTime,
  } = data;
  return db.one(insertQuestions, [
    questionId,
    batchId.max,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    ans,
    totalQuestions,
    totalTime,
  ]);
};
