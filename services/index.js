import {
  getSingleUserByEmail, addNewUser,
  newApplication, updateUserPassword, checkCurrentBatchUser,
  getQuestions, getSingleUserById,
} from './user';
import {
  getSingleAdminByEmail,
  getAllUsers,
  updateUserbyAdmin,
  setNewApplication, checkBatchId, addQuestions,
  updateAdminDetails, getSingleQuestion, recordQuestion,
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
};
