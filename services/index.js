import {
  getSingleUserByEmail, addNewUser,
  newApplication, updateUserPassword, checkCurrentBatchUser,
  getQuestions, getSingleUserById, getQuestionsInDb,
} from './user';
import {
  getSingleAdminByEmail,
  getAllUsers,
  updateUserbyAdmin,
  setNewApplication, checkBatchId, addQuestions,
  updateAdminDetails, getSingleQuestion, recordQuestion,
  updateUserApprovalStatus, getEntriesSummary,
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
};
