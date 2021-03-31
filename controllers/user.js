import {
  addNewUser, getSingleUserByEmail,
  checkCurrentBatchUser, newApplication, getSingleUserById, getQuestions,
} from '../services';

import { hashPassword, comparePassword, convertDataToToken } from '../utils';

export const registerNewUser = async (req, res) => {
  try {
    const encryptedPassword = hashPassword(req.body.password);
    const userInfo = {
      ...req.body,
      password: encryptedPassword,
    };
    await addNewUser(userInfo);
    res.status(201).json({
      status: 'Success',
      message: 'Registration successful',
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const batchId = await checkCurrentBatchUser();
    console.log(batchId);
    const user = await getSingleUserByEmail(email);
    console.log(user);
    if (!user) {
      return res.status(401).json({
        status: 'Fail',
        message: 'Invalid login details',
      });
    }
    if (user.length === 0) {
      if ((user.batch_id === batchId.max) && comparePassword(password, user.password)) {
        const token = convertDataToToken({ email, id: user.user_id });
        return res.status(201).json({
          status: 'Success',
          message: 'Login successful',
          token,
          userId: user.user_id,
        });
      }
      return res.status(401).json({
        status: 'Fail',
        message: 'Invalid login details',
      });
    }
    const latest = user[user.length - 1];
    console.log(latest);
    if ((latest.batch_id === batchId.max) && comparePassword(password, latest.password)) {
      const token = convertDataToToken({ email, id: latest.user_id });
      return res.status(201).json({
        status: 'Success',
        message: 'Login successful',
        token,
        userId: latest.user_id,
      });
    }
    return res.status(401).json({
      status: 'Fail',
      message: 'Invalid login details',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wronga',
    });
  }
};

export const createApplication = async (req, res) => {
  const { body } = req;
  const user = req.user.user_id;
  try {
    const applicantDeets = await newApplication(user, body);
    console.log(applicantDeets);
    res.status(201).json({
      status: 'success',
      message: 'Application successful.',
      data: applicantDeets,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wronger.',
    });
  }
};

export const returnSingleUser = async (req, res) => {
  try {
    const currentUser = await getSingleUserById(req.params.userid);
    delete currentUser.password;
    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: currentUser,
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

export const retrieveQuestions = async (req, res) => {
  try {
    const questions = await getQuestions(req.batch);
    res.status(200).json({
      status: 'Success',
      message: 'Questions fetched successfully',
      data: questions,
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};
