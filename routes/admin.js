import { Router } from 'express';
import {
  loginAdmin,
  authVerified, sendNewApplication, saveQuestions, updateUserApplicationStatus,
  returnAllUsers, updateTheAdmin, updateTheUserApprovalStatus,
  retrieveEntriesSummary, returnUsersByBatch, getAssessmentDetails,
  checkIfQuestionsForBatchAvailable,
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
adminRouter.post('/adminquestions', authenticate, saveQuestions);
adminRouter.put('/updateuserstatus/:email', authVerified, updateUserApplicationStatus);
adminRouter.get('/admin/allusers', authenticate, returnAllUsers);
adminRouter.post('/adminupdate', authenticate, cloudinaryUploadThree, validateAdminUpdateData, getAdminProfile, updateTheAdmin);
adminRouter.post('/update', authenticate, updateTheUserApprovalStatus);
adminRouter.get('/summary', authenticate, retrieveEntriesSummary);
adminRouter.get('/allUsers', authenticate, returnUsersByBatch);
adminRouter.get('/assessment_details', authenticate, getAssessmentDetails);
adminRouter.get('/admin/assessment_questions', authenticate, checkIfQuestionsForBatchAvailable);

export default adminRouter;
