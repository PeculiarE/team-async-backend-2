import {
  loginAdmin, authVerified, sendNewApplication, populateQuestions,
  updateUserApplicationStatus, updateTheAdmin,
  returnAllUsers, postQuestions, updateTheUserApprovalStatus, retrieveEntriesSummary,
  returnUsersByBatch,
} from './admin';

import {
  createApplication, registerNewUser, loginUser, returnSingleUser, retrieveQuestions,
  resetPassword, updatePassword, getAllQuestions, saveTestScore,
} from './user';

export {
  createApplication, registerNewUser, loginUser, loginAdmin, authVerified, sendNewApplication,
  populateQuestions, returnSingleUser, resetPassword, updatePassword,
  updateUserApplicationStatus, postQuestions, returnAllUsers,
  retrieveQuestions, updateTheAdmin, getAllQuestions, updateTheUserApprovalStatus,
  retrieveEntriesSummary, saveTestScore, returnUsersByBatch,
};
