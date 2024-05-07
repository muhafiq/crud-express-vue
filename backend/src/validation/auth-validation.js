import Joi from "joi";

export const registerValidation = Joi.object({
  username: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).max(100).required(),
  confPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).max(100).required(),
});
