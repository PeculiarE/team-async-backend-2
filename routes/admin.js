import { Router } from 'express';
import {
  loginAdmin, authVerified, sendNewApplication, populateQuestionsTable,
} from '../controllers';
import {
  validateAdminLoginData, validateAdminApplication, authenticate, checkIfBatchAlreadyExists,
} from '../middlewares';

const adminRouter = Router();

adminRouter.post('/adminlogin', validateAdminLoginData, loginAdmin);
adminRouter.get('/adminverify', authenticate, authVerified);
adminRouter.post('/adminapplication', authenticate, validateAdminApplication, checkIfBatchAlreadyExists, sendNewApplication);
adminRouter.post('/batch', populateQuestionsTable);

export default adminRouter;
