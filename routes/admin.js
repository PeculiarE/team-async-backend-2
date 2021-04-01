import { Router } from 'express';
import {
  loginAdmin,
  authVerified, sendNewApplication, populateQuestions, postQuestions, updateUserApplicationStatus,
  returnAllUsers, updateTheAdmin,
} from '../controllers';
import {
  validateAdminLoginData,
  validateAdminApplication,
  authenticate,
  cloudinaryUploadTwo,
  checkIfBatchAlreadyExists,
  cloudinaryUploadThree,
  validateAdminUpdateData,
  getAdminProfile,
} from '../middlewares';

const adminRouter = Router();

adminRouter.post('/adminlogin', validateAdminLoginData, loginAdmin);
adminRouter.get('/adminverify', authenticate, authVerified);
adminRouter.post('/adminapplication', authenticate, cloudinaryUploadTwo, validateAdminApplication, checkIfBatchAlreadyExists, sendNewApplication);
adminRouter.post('/adminquestions', authenticate, populateQuestions);

adminRouter.put('/updateuserstatus/:email', authVerified, updateUserApplicationStatus);
adminRouter.get('/admin/allusers', authenticate, returnAllUsers);
adminRouter.post('/adminupdate', authenticate, cloudinaryUploadThree, validateAdminUpdateData, getAdminProfile, updateTheAdmin);
adminRouter.post('/question', authenticate, postQuestions);

export default adminRouter;
