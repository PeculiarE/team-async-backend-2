import { getSingleAdminByEmail, setNewApplication, addQuestions } from '../services';

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
      message: 'Something went wronge',
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
