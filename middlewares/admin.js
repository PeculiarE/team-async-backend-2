import { loginAdminSchema, applicationAdminSchema, updateAdminSchema } from '../validation';
import { checkBatchId, getSingleAdminByEmail, getSingleQuestion } from '../services';

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
      message: 'Batch already exists!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const validateAdminUpdateData = (req, res, next) => {
  try {
    const { error } = updateAdminSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({
      status: 'Fail',
      message: error.message,
      data: req.yes,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await getSingleAdminByEmail(req.entrant.email);
    if (admin) {
      req.admin = admin;
      return next();
    }
    return res.status(400).json({
      status: 'Fail',
      message: 'You need to signup or login.',
      data: req.yes,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong.',
    });
  }
};

export const validateQuestion = async (req, res, next) => {
  try {
    const { question } = req.body;
    const questionType = await getSingleQuestion(question);
    console.log(questionType);
    if (!question) {
      next();
    }
    return res.status(409).json({
      status: 'Fail',
      message: 'Question already exists!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong.',
    });
  }
};
