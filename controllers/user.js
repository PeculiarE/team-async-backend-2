/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {
  addNewUser, getSingleUserByEmail, newApplication,
  updateUserPassword, checkCurrentBatchUser, getSingleUserById, getQuestions, getQuestionsInDb,
  inputTestScore, getBatchTime, retrieveTestScore,
} from '../services';

import {
  hashPassword, comparePassword, convertDataToToken, verifyToken,
} from '../utils';

dotenv.config();

export const registerNewUser = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    const { err, data } = verifyToken(token);
    console.log(err, data);
    if (err) {
      console.log(err);
      return res
        .status(401)
        .json({ status: 'Fail', message: 'Verification link expired' });
    }
    const encryptedPassword = hashPassword(data.password);
    const userInfo = {
      ...data,
      password: encryptedPassword,
    };
    await addNewUser(userInfo);
    return res.status(201).json({
      status: 'Success',
      message: 'Verification successful',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const batchId = await checkCurrentBatchUser();
    const user = await getSingleUserByEmail(email);
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
      message: 'Something went wrong.',
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
  const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    service: 'gmail',
    // port: 587,
    // secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.PASS_WORD,
    },
  });
  try {
    const { email } = req.body;
    // console.log(req.body);
    const userer = await getSingleUserByEmail(email);
    // console.log(userer);
    const userToken = convertDataToToken({
      email,
      id: userer.id,
    });
    const mailOptions = await transporter.sendMail({
      from: `"Password Ninja" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Reset Password',
      text: `<a href="http://localhost:8080/resetpassword/${userToken}">Reset password</a>`,
      html: `<a href="http://localhost:8080/resetpassword/${userToken}">Reset password</a>`,
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    });
    res.status(200).json({
      status: 'success',
      message: 'password reset link sent successfully.',
    });
    // console.log('Message sent: %s', mailOptions.messageId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong in controller',
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
    console.log(userss);
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

export const getAllQuestions = async (req, res) => {
  try {
    console.log(req.batch);
    const questions = await getQuestionsInDb(req.batch);
    res.status(200).json({
      status: 'Success',
      message: 'Questions fetched successfully',
      data: questions,
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Something went wronger.' });
  }
};

export const getQuizTime = async (req, res) => {
  try {
    console.log(req.batch);
    const time = await getBatchTime(req.batch);
    res.status(200).json({
      status: 'Success',
      message: 'Questions fetched successfully',
      data: time,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveTestScore = async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    await inputTestScore(payload, req.user.user_id);
    res.status(200).json({
      status: 'Success',
      message: 'Test score recorded successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Success',
      message: 'Something went wrongy.',
    });
  }
};

export const getTestScore = async (req, res) => {
  console.log(req.user);
  try {
    const userTestScore = await retrieveTestScore(req.user.user_id);
    console.log(userTestScore);
    res.status(200).json({
      status: 'Success',
      message: 'User test score retrieved successfully',
      data: userTestScore,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Success',
      message: 'Something went wrongy.',
          });
  }
};

export const verifyEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    service: 'gmail',
    // port: 587,
    // secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.PASS_WORD,
    },
  });
  try {
    const { email } = req.body;
    // console.log(req.body);
    const userToken = convertDataToToken(req.body);
    const mailOptions = await transporter.sendMail({
      from: `"Enyata Academy" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Email Verification',
      text: `Thank you for registering for Enyata Academy. Please click on
      <a href="http://localhost:8080/verifyuser/${userToken}">this link</a> to verify your email address`,
      html: `Thank you for registering for Enyata Academy. Please click on
      <a href="http://localhost:8080/verifyuser/${userToken}">this link</a> to verify your email address`,
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    });
    res.status(200).json({
      status: 'Success',
      message: `Registration successful! Please check your inbox and click on the provided link
      to verify your email`,
    });
    // console.log('Message sent: %s', mailOptions.messageId);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong in controller',
    });
  }
};
