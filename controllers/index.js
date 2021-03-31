import {
  loginAdmin, authVerified, sendNewApplication, populateQuestions,
  updateUserApplicationStatus,
  returnAllUsers,
} from './admin';
import {
  createApplication, registerNewUser, loginUser, returnSingleUser, resetPassword, updatePassword,
} from './user';

export {
  createApplication, registerNewUser, loginUser, loginAdmin, authVerified, sendNewApplication,
  populateQuestions, returnSingleUser, resetPassword, updatePassword,
  updateUserApplicationStatus, returnAllUsers,
};
