import Joi from 'joi';

export const loginAdminSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).required(),
});

export const applicationAdminSchema = Joi.object({
  batchId: Joi.number().min(1).required(),
  applicationLink: Joi.string().trim().required(),
  closureDate: Joi.date().required(),
  instructions: Joi.string().min(15).required(),
});
