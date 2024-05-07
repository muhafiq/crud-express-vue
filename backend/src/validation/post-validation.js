import Joi from "joi";

export const searchQueryValidation = Joi.string().min(3).required();

export const createPostValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(3),
  authorId: Joi.exist().required(),
});

export const updatePostValidation = Joi.object({
  postId: Joi.exist().required(),
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(3),
});

export const deletePostValidation = Joi.object({
  postId: Joi.exist().required(),
});
