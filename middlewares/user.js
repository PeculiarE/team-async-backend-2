import { signUpSchema, loginSchema, applicationSchema } from '../validation';
import {
  getSingleUserByEmail, checkCurrentBatchUser, getSingleUserById,
} from '../services';

export const validateNewUserData = (req, res, next) => {
  try {
    const { error } = signUpSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({
      status: 'Fail',
      message: error.message,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const checkIfUserAlreadyExistsForCurrentBatch = async (req, res, next) => {
  try {
    const user = await getSingleUserByEmail(req.body.email);
    const batchId = await checkCurrentBatchUser();
    console.log(user.length);
    if (!user) {
      return next();
    }
    if (user.length === 0) {
      if (user.batch_id === batchId.max) {
        return res.status(409).json({
          status: 'Fail',
          message: 'User already exists!',
        });
      }
      return next();
    }
    const latest = user[user.length - 1];
    if (latest.batch_id === batchId.max) {
      return res.status(409).json({
        status: 'Fail',
        message: 'User already exists!',
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const validateLoginData = (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({
      status: 'Fail',
      message: error.message,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const validateApplication = (req, res, next) => {
  try {
    const { error } = applicationSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({
      status: 'Fail',
      message: error.message,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong.',
    });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const applicant = await getSingleUserById(req.entrant.id);
    if (applicant) {
      req.user = applicant;
      return next();
    }
    return res.status(400).json({
      status: 'Fail',
      message: 'You need to signup or login.',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong.',
    });
  }
};

export const getUserBatch = async (req, res, next) => {
  try {
    const userId = req.entrant.id;
    const user = await getSingleUserById(userId);
    if (user) {
      req.batch = user.batch_id;
      return next();
    }
    return res.status(400).json({
      status: 'Fail',
      message: 'You need to signup or login.',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong.',
    });
  }
};
