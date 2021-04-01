/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {
  addNewUser, getSingleUserByEmail, newApplication,
  updateUserPassword, checkCurrentBatchUser, getSingleUserById, getQuestions,
} from '../services';

import {
  hashPassword, comparePassword, convertDataToToken, verifyToken,
} from '../utils';

dotenv.config();

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
    const time = await newApplication(user, body);
    console.log(time);
    res.status(201).json({
      status: 'success',
      message: 'Application successful.',
      body,
      updatedTime: time.updated_at,
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

export const resetPassword = async (req, res) => {
  const password = process.env.PASSWORD;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'abidemirolake@gmail.com',
      pass: password,
    },
  });
  try {
    const { email } = req.body;
    console.log(req.body);
    const userer = await getSingleUserByEmail(email);
    console.log(userer);
    const userToken = convertDataToToken({
      email,
      id: userer.id,
    });
    const mailOptions = await transporter.sendMail({
      from: '"Password Ninja" <abidemirolake@gmail.com>',
      to: email,
      subject: 'Reset Password',
      text: `<a href="http://localhost:8080/resetpassword/${userToken}">Reset password</a>`,
      html: `<a href="http://localhost:8080/resetpassword/${userToken}">Reset password</a>`,
    });
    res.status(200).json({
      status: 'success',
      message: 'password reset link sent successfully.',
    });
    console.log('Message sent: %s', mailOptions.messageId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong ',
    });
  }
};

// eslint-disable-next-line consistent-return
export const updatePassword = async (req, res) => {
  try {
    const { err, data } = verifyToken(req.params.token);
    console.log(req.body);
    console.log(req.params.token);
    if (err) {
      console.log(err);
      return res
        .status(401)
        .json({ status: 'fail', message: 'Invalid token' });
    }
    const userss = data;
    const hashedPassword = hashPassword(req.body.password);
    const updatedUser = await updateUserPassword(
      { ...req.body, password: hashedPassword }, userss.email,
    );
    console.log(userss.email);
    res
      .status(201)
      .json({ status: 'success', message: 'Password updated successfully.', data: updatedUser });
  } catch (error) {
    console.log(error);
    console.log(req.params);
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
