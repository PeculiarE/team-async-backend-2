import { Router } from 'express';
import {
  registerNewUser, loginUser, createApplication, returnSingleUser, retrieveQuestions,
} from '../controllers';
import {
  authenticate, validateNewUserData, checkIfUserAlreadyExists, validateLoginData,
  cloudinaryUpload, validateApplication, getUserProfile, getUserBatch,
} from '../middlewares';

const userRouter = Router();

userRouter.post('/register', validateNewUserData, checkIfUserAlreadyExists, registerNewUser);
userRouter.post('/login', validateLoginData, loginUser);
userRouter.post('/application', authenticate, cloudinaryUpload, validateApplication, getUserProfile, createApplication);
userRouter.get('/user/dashboard/:userid', returnSingleUser);
userRouter.get('/user/assessment', authenticate, getUserBatch, retrieveQuestions);

export default userRouter;
