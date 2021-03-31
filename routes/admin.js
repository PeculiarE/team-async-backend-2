import { Router } from 'express';
import {
  loginAdmin, authVerified, sendNewApplication, populateQuestions, updateTheAdmin,
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
adminRouter.post('/adminupdate', authenticate, cloudinaryUploadThree, validateAdminUpdateData, getAdminProfile, updateTheAdmin);

export default adminRouter;
