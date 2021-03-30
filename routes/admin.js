import { Router } from 'express';
import { loginAdmin, authVerified } from '../controllers';
import { validateAdminLoginData, authenticate } from '../middlewares';

const adminRouter = Router();

adminRouter.post('/adminlogin', validateAdminLoginData, loginAdmin);
adminRouter.get('/adminverify', authenticate, authVerified);

export default adminRouter;
