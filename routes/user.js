import { Router } from 'express';
import {
  registerNewUser, loginUser, createApplication, returnSingleUser,
  resetPassword, updatePassword, getQuizTime, getAllQuestions, saveTestScore,
  getTestScore, verifyEmail,
} from '../controllers';
import {
  authenticate, validateNewUserData, checkIfUserAlreadyExistsForCurrentBatch, validateLoginData,
  cloudinaryUpload, validateApplication, getUserProfile, getUserBatch,
} from '../middlewares';

const userRouter = Router();

userRouter.post('/register', validateNewUserData, checkIfUserAlreadyExistsForCurrentBatch, verifyEmail);
userRouter.post('/verify/:token', registerNewUser);
userRouter.post('/login', validateLoginData, loginUser);
userRouter.post('/application', authenticate, cloudinaryUpload, validateApplication, getUserProfile, createApplication);
userRouter.get('/user/dashboard/:userid', returnSingleUser);
userRouter.post('/user/reset', resetPassword);
userRouter.put('/resetpassword/:token', updatePassword);
userRouter.get('/user/assessment_questions', authenticate, getUserBatch, getAllQuestions);
userRouter.post('/user/quiz_results', authenticate, getUserProfile, saveTestScore);
userRouter.get('/user/quiz_time', authenticate, getUserBatch, getQuizTime);
userRouter.get('/user/test_score', authenticate, getUserProfile, getTestScore);

export default userRouter;
