import {
  loginAdmin, authVerified, sendNewApplication, populateQuestions,
  updateUserApplicationStatus, updateTheAdmin,
  returnAllUsers, postQuestions,
} from './admin';

import {
  createApplication, registerNewUser, loginUser, returnSingleUser, retrieveQuestions,
  resetPassword, updatePassword, getAllQuestions,
} from './user';

export {
  createApplication, registerNewUser, loginUser, loginAdmin, authVerified, sendNewApplication,
  populateQuestions, returnSingleUser, resetPassword, updatePassword,
  updateUserApplicationStatus, postQuestions, returnAllUsers,
  retrieveQuestions, updateTheAdmin, getAllQuestions,
};
