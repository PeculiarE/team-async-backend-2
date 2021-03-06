// import { getCurrentBatch } from '../db/queries/admin';
import {
  getSingleAdminByEmail, setNewApplication, addQuestions,
  updateUserbyAdmin, getAllUsers, updateAdminDetails, updateUserApprovalStatus,
  getEntriesSummary, checkCurrentBatch, getUsersInBatch, getAssessmentHistory,
  getQuestionsInBatch,
} from '../services';

import { convertDataToToken } from '../utils';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await getSingleAdminByEmail(email);
    if (admin && password.toString() === admin.password.toString()) {
      const token = convertDataToToken({ email, id: admin.admin_id });
      return res.status(201).json({
        status: 'Success',
        message: 'Login successful',
        token,
        deets: {
          image: admin.photo_url,
          adminName: admin.full_name,
          adminEmail: email,
          adminPhone: admin.phone,
          adminAddress: admin.address,
          adminCountry: admin.country,
        },
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

export const authVerified = async (req, res) => {
  try {
    const message = 'Access verified';
    return res.status(200).json({
      status: 'Success',
      message,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const sendNewApplication = async (req, res) => {
  try {
    await setNewApplication(req.body);
    return res.status(200).json({
      status: 'Success',
      message: 'Application advert sent successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const updateTheAdmin = async (req, res) => {
  try {
    const { body, admin } = req;
    const updated = await updateAdminDetails(admin, body);
    return res.status(200).json({
      status: 'Success',
      message: 'Details updated successfully',
      deets: {
        image: updated.photo_url,
        adminName: updated.full_name,
        adminEmail: updated.email,
        adminPhone: updated.phone,
        adminAddress: updated.address,
        adminCountry: updated.country,
        dr: req.yes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

export const updateUserApplicationStatus = async (req, res) => {
  try {
    const { email } = req.params;
    // const userToBeUpdated = await getUserByEmail(email)
    const userToBeUpdated = await updateUserbyAdmin(req.body, email);
    res
      .status(201)
      .json({ status: 'success', message: 'User updated successfully.', data: userToBeUpdated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

export const returnAllUsers = async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json({
      status: 'Success',
      message: 'Users fetched successfully',
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

export const updateTheUserApprovalStatus = async (req, res) => {
  try {
    const { userId, newStatus } = req.body;
    await updateUserApprovalStatus(userId, newStatus);
    res.status(201).json({
      status: 'Success',
      message: 'Approval status updated successfully.',
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong here.',
    });
  }
};

export const retrieveEntriesSummary = async (req, res) => {
  try {
    const summary = await getEntriesSummary();
    res.status(201).json({
      status: 'Success',
      message: 'Summary fetched successfully.',
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong here.',
    });
  }
};

export const returnUsersByBatch = async (req, res) => {
  try {
    const batchId = await checkCurrentBatch();
    console.log(batchId.max);
    const users = await getUsersInBatch(batchId.max);
    res.status(200).json({
      status: 'Success',
      message: `Batch ${batchId.max} applicants fetched successfully`,
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveQuestions = async (req, res) => {
  // console.log('populate', req.body);
  try {
    const adminId = req.entrant.id;
    const a = await addQuestions(adminId, req.body);
    return res.status(200).json({
      status: 'Success',
      message: 'Questions added successfully',
      data: a,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wronger',
    });
  }
};

export const getAssessmentDetails = async (req, res) => {
  try {
    const assessmentsHistory = await getAssessmentHistory();
    console.log(assessmentsHistory);
    res.status(200).json({
      status: 'Success',
      message: 'History fetched successfully',
      data: assessmentsHistory,
    });
    // console.log(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Couldn\'t fetch',
    });
  }
};

export const checkIfQuestionsForBatchAvailable = async (req, res) => {
  try {
    const batchId = await checkCurrentBatch();
    console.log(batchId.max);
    const questions = await getQuestionsInBatch(batchId.max);
    console.log(questions);
    res.status(200).json({
      status: 'Success',
      message: `Batch ${batchId.max} questions fetched successfully`,
      data: questions,
    });
  } catch (error) {
    console.log(error);
  }
};
