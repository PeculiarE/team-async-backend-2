import { cloudinaryConfig, cloudinaryConfigAd, cloudinaryConfigUpdate } from '../utils';

export const cloudinaryUpload = async (req, res, next) => {
  try {
    const data = await cloudinaryConfig(req.files.cv.tempFilePath, req.files.photo.tempFilePath);
    req.body.cv = data[0].secure_url;
    req.body.photo = data[1].secure_url;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const cloudinaryUploadTwo = async (req, res, next) => {
  try {
    const data = await cloudinaryConfigAd(req.files.design.tempFilePath);
    req.body.design = data[0].secure_url;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const cloudinaryUploadThree = async (req, res, next) => {
  try {
    const data = await cloudinaryConfigUpdate(req.files.photo.tempFilePath);
    req.body.photo = data[0].secure_url;
    next();
  } catch (error) {
    console.log(error);
  }
};
