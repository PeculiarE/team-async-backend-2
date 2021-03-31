import { Router } from 'express';
import {
  registerNewUser, loginUser, createApplication, returnSingleUser, resetPassword, updatePassword,
} from '../controllers';
import {
  authenticate, validateNewUserData, checkIfUserAlreadyExists, validateLoginData,
  cloudinaryUpload, validateApplication, getUserProfile,
} from '../middlewares';

const userRouter = Router();

userRouter.post('/register', validateNewUserData, checkIfUserAlreadyExists, registerNewUser);
userRouter.post('/login', validateLoginData, loginUser);
userRouter.post('/application', authenticate, cloudinaryUpload, validateApplication, getUserProfile, createApplication);
userRouter.get('/user/dashboard/:userid', returnSingleUser);
userRouter.post('/user/reset', resetPassword);
userRouter.put('/resetPassword/:token', updatePassword);
export default userRouter;
