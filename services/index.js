import {
  getSingleUserByEmail, addNewUser,
  newApplication, updateUserPassword, checkCurrentBatchUser,
  getQuestions, getSingleUserById, getQuestionsInDb, inputTestScore, getBatchTime,
} from './user';
import {
  getSingleAdminByEmail,
  getAllUsers,
  updateUserbyAdmin,
  setNewApplication, checkBatchId, addQuestions,
  updateAdminDetails, getSingleQuestion,
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
  getBatchTime,
};
