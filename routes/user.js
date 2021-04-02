import { Router } from 'express';
import {
  registerNewUser, loginUser, createApplication, returnSingleUser, resetPassword, updatePassword,
  retrieveQuestions,
} from '../controllers';
import {
  authenticate, validateNewUserData, checkIfUserAlreadyExistsForCurrentBatch, validateLoginData,
  cloudinaryUpload, validateApplication, getUserProfile, getUserBatch,
} from '../middlewares';

const userRouter = Router();

userRouter.post('/register', validateNewUserData, checkIfUserAlreadyExistsForCurrentBatch, registerNewUser);
userRouter.post('/login', validateLoginData, loginUser);
userRouter.post('/application', authenticate, cloudinaryUpload, validateApplication, getUserProfile, createApplication);
userRouter.get('/user/dashboard/:userid', returnSingleUser);
userRouter.post('/user/reset', resetPassword);
userRouter.put('/resetpassword/:token', updatePassword);
userRouter.get('/user/assessment', authenticate, getUserBatch, retrieveQuestions);

export default userRouter;
