import { Router } from 'express';
import {
  loginAdmin, authVerified, sendNewApplication, populateQuestions,
} from '../controllers';
import {
  validateAdminLoginData,
  validateAdminApplication,
  authenticate,
  cloudinaryUploadTwo,
  checkIfBatchAlreadyExists,
} from '../middlewares';

const adminRouter = Router();

adminRouter.post('/adminlogin', validateAdminLoginData, loginAdmin);
adminRouter.get('/adminverify', authenticate, authVerified);
adminRouter.post('/adminapplication', authenticate, cloudinaryUploadTwo, validateAdminApplication, checkIfBatchAlreadyExists, sendNewApplication);
adminRouter.post('/adminquestions', authenticate, populateQuestions);

export default adminRouter;
