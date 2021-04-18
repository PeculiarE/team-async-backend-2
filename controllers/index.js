import {
  loginAdmin, authVerified, sendNewApplication, saveQuestions,
  updateUserApplicationStatus, updateTheAdmin,
  returnAllUsers, updateTheUserApprovalStatus, retrieveEntriesSummary,
  returnUsersByBatch, getAssessmentDetails,
} from './admin';

import {
  createApplication, registerNewUser, loginUser, returnSingleUser, retrieveQuestions,
  resetPassword, updatePassword, getAllQuestions, saveTestScore, getQuizTime,
} from './user';

export {
  createApplication, registerNewUser, loginUser, loginAdmin, authVerified, sendNewApplication,
  saveQuestions, returnSingleUser, resetPassword, updatePassword,
  updateUserApplicationStatus, returnAllUsers,
  retrieveQuestions, updateTheAdmin, getAllQuestions, updateTheUserApprovalStatus,
  retrieveEntriesSummary, saveTestScore, returnUsersByBatch, getQuizTime, getAssessmentDetails,
};
