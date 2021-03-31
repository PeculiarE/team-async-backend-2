import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';

dotenv.config();

const salt = genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET;

const convertDataToToken = (data) => jwt.sign(data, jwtSecret, { expiresIn: '1h' });

const verifyToken = (token) => jwt.verify(token, jwtSecret, (err, data) => ({ err, data }));

const hashPassword = (password) => hashSync(password, salt);

const comparePassword = (plainPassword, hashedPassword) => (
  compareSync(plainPassword, hashedPassword)
);

const generateUUID = () => uuidv4();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryConfig = async (cvPath, photoPath) => {
  try {
    const cvData = await cloudinary.v2.uploader.upload(cvPath);
    const photoData = await cloudinary.v2.uploader.upload(photoPath);
    const data = [cvData, photoData];
    return data;
  } catch (error) {
    return (error);
  }
};
const cloudinaryConfigAd = async (designPath) => {
  try {
    const designData = await cloudinary.v2.uploader.upload(designPath);
    const data = [designData];
    return data;
  } catch (error) {
    return (error);
  }
};
const cloudinaryConfigUpdate = async (photoPath) => {
  try {
    const photoData = await cloudinary.v2.uploader.upload(photoPath);
    const data = [photoData];
    return data;
  } catch (error) {
    return (error);
  }
};

export {
  cloudinaryConfig,
  generateUUID,
  convertDataToToken, verifyToken, hashPassword, comparePassword,
  cloudinaryConfigAd, cloudinaryConfigUpdate,
};
