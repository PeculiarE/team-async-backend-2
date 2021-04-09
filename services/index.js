import {
  getSingleUserByEmail, addNewUser,
  newApplication, updateUserPassword, checkCurrentBatchUser,
  getQuestions, getSingleUserById, getQuestionsInDb, inputTestScore,
} from './user';
import {
  getSingleAdminByEmail,
  getAllUsers,
  updateUserbyAdmin,
  setNewApplication, checkBatchId, addQuestions,
  updateAdminDetails, getSingleQuestion, recordQuestion,
  updateUserApprovalStatus, getEntriesSummary, getUsersInBatch, checkCurrentBatch,
} from './admin';

export {
  getSingleUserByEmail,
  checkCurrentBatchUser,
  addNewUser,
  getSingleAdminByEmail,
  newApplication,
  setNewApplication,
  checkBatchId,
  recordQuestion,
  addQuestions,
  updateUserPassword,
  getAllUsers,
  getSingleQuestion,
  updateUserbyAdmin,
  getQuestions,
  getSingleUserById,
  updateAdminDetails,
  getQuestionsInDb,
  updateUserApprovalStatus,
  getEntriesSummary,
  inputTestScore,
  getUsersInBatch,
  checkCurrentBatch,
};
