import Joi from 'joi';

export const loginAdminSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).required(),
});

export const applicationAdminSchema = Joi.object({
  batchId: Joi.number().min(1).required(),
  design: Joi.string(),
  applicationLink: Joi.string().trim().required(),
  closureDate: Joi.date().required(),
  instructions: Joi.string().min(15).required(),
});

export const updateAdminSchema = Joi.object({
  fullName: Joi.string().trim().min(5).max(100),
  email: Joi.string().trim().email(),
  phone: Joi.string().allow('').trim().regex(/^(?:[[0-9]{7,15}]+)?$/),
  address: Joi.string().trim().allow(''),
  country: Joi.string().trim(),
  photo: Joi.string().allow('null'),
});
