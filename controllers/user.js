import { addNewUser, getSingleUserByEmail, newApplication } from '../services';
import { getSingleUserById } from '../services/user';

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
    const user = await getSingleUserByEmail(email);
    if (user && comparePassword(password, user.password)) {
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
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
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
