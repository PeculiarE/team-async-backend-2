import {
  loginAdmin, authVerified, sendNewApplication, saveQuestions,
  updateUserApplicationStatus, updateTheAdmin,
  returnAllUsers, updateTheUserApprovalStatus, retrieveEntriesSummary,
  returnUsersByBatch, getAssessmentDetails,
} from './admin';

import {
  createApplication, registerNewUser, loginUser, returnSingleUser, retrieveQuestions,
  resetPassword, updatePassword, getAllQuestions, saveTestScore, getQuizTime, verifyEmail,
} from './user';

export {
  createApplication, registerNewUser, loginUser, loginAdmin, authVerified, sendNewApplication,
  saveQuestions, returnSingleUser, resetPassword, updatePassword,
  updateUserApplicationStatus, returnAllUsers,
  retrieveQuestions, updateTheAdmin, getAllQuestions, updateTheUserApprovalStatus, getAssessmentDetails,
  retrieveEntriesSummary, saveTestScore, returnUsersByBatch, getQuizTime, verifyEmail,
};
