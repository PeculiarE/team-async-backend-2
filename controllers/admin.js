// import { getCurrentBatch } from '../db/queries/admin';
import {
  getSingleAdminByEmail, setNewApplication, addQuestions,
  updateUserbyAdmin, getAllUsers, updateAdminDetails, recordQuestion, updateUserApprovalStatus,
  getEntriesSummary, checkCurrentBatch, getUsersInBatch,
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

export const populateQuestions = async (req, res) => {
  try {
    const adminId = req.entrant.id;
    await addQuestions(adminId, req.body.arr);
    return res.status(200).json({
      status: 'Success',
      message: 'Questions added successfully',
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
    const { body } = req;
    const admin = req.admin.admin_id;
    await updateAdminDetails(admin, body);
    return res.status(200).json({
      status: 'Success',
      message: 'Details updated successfully',
      deets: {
        image: body.photo,
        adminName: body.fullName,
        adminEmail: body.email,
      },
      extraDeets: {
        adminFullName: body.name,
        adminPhone: body.phone,
        adminAddress: body.address,
        adminCountry: body.country,
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

export const postQuestions = async (req, res) => {
  try {
    await recordQuestion(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Question recorded successfully.',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong here.',
    });
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
