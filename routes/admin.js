import { Router } from 'express';
import {
  loginAdmin,
  authVerified, sendNewApplication, populateQuestions, updateUserApplicationStatus,
  returnAllUsers,
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
adminRouter.put('/updateuserstatus/:email', authVerified, updateUserApplicationStatus);
adminRouter.get('/admin/allusers', authenticate, authVerified, returnAllUsers);

export default adminRouter;
