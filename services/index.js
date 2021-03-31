import {
  getSingleUserByEmail, addNewUser,
  newApplication, updateUserPassword,
} from './user';
import {
  getSingleAdminByEmail,
  getAllUsers,
  updateUserbyAdmin,
  setNewApplication, checkBatchId, addQuestions,
} from './admin';

export {
  getSingleUserByEmail,
  addNewUser,
  getSingleAdminByEmail,
  newApplication,
  setNewApplication,
  checkBatchId,
  addQuestions,
  updateUserPassword,
  getAllUsers,
  updateUserbyAdmin,
};
