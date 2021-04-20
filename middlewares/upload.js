import {
  cloudinaryConfig, cloudinaryConfigAd, cloudinaryConfigUpdate, cloudinaryConfigQuestions,
} from '../utils';

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
    if (req.files === null || req.files === 'removed') {
      next();
      return;
    }
    const data = await cloudinaryConfigUpdate(req.files.photo.tempFilePath);
    req.yes = {
      a: req.files,
      b: req.files.photo,
      c: req.files.photo.tempFilePath,
      d: data,
    };
    req.body.photo = data[0].secure_url;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const cloudinaryUploadFour = async (req, res, next) => {
  console.log('cloudUpload', req.body);
  console.log('cloudUpload', req.body.adminQuestions.file);
  try {
    const data = await cloudinaryConfigQuestions(req.body.adminQuestions.file.tempFilePath);
    req.body.adminQuestions.file = data.secure_url;
    console.log('cloudUpload', data.secure_url);
    next();
  } catch (error) {
    console.log('cloudUpload', error);
  }
};
