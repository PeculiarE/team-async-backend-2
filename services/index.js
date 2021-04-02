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
  updateAdminDetails, fetchAllApplicants,
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
  updateUserbyAdmin,
  getQuestions,
  getSingleUserById,
  updateAdminDetails,
  fetchAllApplicants,
};
