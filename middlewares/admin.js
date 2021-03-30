import { loginAdminSchema, applicationAdminSchema } from '../validation';
import { checkBatchId } from '../services';

export const validateAdminLoginData = (req, res, next) => {
  try {
    const { error } = loginAdminSchema.validate(req.body);
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

export const validateAdminApplication = (req, res, next) => {
  try {
    const { error } = applicationAdminSchema.validate(req.body);
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

export const checkIfBatchAlreadyExists = async (req, res, next) => {
  try {
    const batch = await checkBatchId(req.body.batchId);
    if (!batch) {
      return next();
    }
    return res.status(409).json({
      status: 'Fail',
      message: 'This batch already exists!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};
