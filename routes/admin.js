import { Router } from 'express';
import { loginAdmin, authVerified, postQuestions } from '../controllers';
import { validateAdminLoginData, authenticate } from '../middlewares';

const adminRouter = Router();

adminRouter.post('/adminlogin', validateAdminLoginData, loginAdmin);
adminRouter.get('/adminverify', authenticate, authVerified);
adminRouter.post('/question', authenticate, postQuestions);
export default adminRouter;

// validateQuestion,
