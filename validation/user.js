import Joi from 'joi';

export const applicationSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  dob: Joi.string().regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  university: Joi.string().required(),
  course: Joi.string().required(),
  cgpa: Joi.string().regex(/^\d{1}[.]\d{2}$/).required(),
  cv: Joi.string().required(),
  photo: Joi.string().required(),
});

export const signUpSchema = Joi.object({
  fullName: Joi.string().trim().min(5).max(100)
    .required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().regex(/^[0-9]{7,15}$/).required(),
  password: Joi.string().trim().min(8).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).required(),
});
