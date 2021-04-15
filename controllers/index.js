import {
  loginAdmin, authVerified, sendNewApplication, populateQuestions,
  updateUserApplicationStatus, updateTheAdmin,
  returnAllUsers, updateTheUserApprovalStatus, retrieveEntriesSummary,
  returnUsersByBatch,
} from './admin';

import {
  createApplication, registerNewUser, loginUser, returnSingleUser, retrieveQuestions,
  resetPassword, updatePassword, getAllQuestions, saveTestScore, getQuizTime,
} from './user';

export {
  createApplication, registerNewUser, loginUser, loginAdmin, authVerified, sendNewApplication,
  populateQuestions, returnSingleUser, resetPassword, updatePassword,
  updateUserApplicationStatus, returnAllUsers,
  retrieveQuestions, updateTheAdmin, getAllQuestions, updateTheUserApprovalStatus,
  retrieveEntriesSummary, saveTestScore, returnUsersByBatch, getQuizTime,
};
