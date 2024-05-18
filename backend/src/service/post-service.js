import prismaClient from "../application/database.js";
import validate from "../validation/validation.js";
import ResponseError from "../error/response-error.js";
import {
  searchQueryValidation,
  createPostValidation,
  updatePostValidation,
  deletePostValidation,
} from "../validation/post-validation.js";

const getAllPosts = async () => {
  return prismaClient.post.findMany({
    select: {
      postId: true,
      title: true,
      content: true,
      author: {
        select: {
          userId: true,
          username: true,
        },
      },
    },
  });
};

const getUserPosts = async (userId) => {
  const result = await prismaClient.post.findMany({
    where: { authorId: userId },
    select: {
      postId: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

  if (result.length === 0) throw new ResponseError(404, "No posts found for this user");

  return result;
};

const searchPosts = async (query) => {
  const validateQuery = validate(searchQueryValidation, query);

  return prismaClient.post.findMany({
    where: {
      OR: [{ title: { contains: validateQuery } }, { content: { contains: validateQuery } }],
    },
    select: {
      postId: true,
      title: true,
      content: true,
      author: {
        select: {
          userId: true,
          username: true,
        },
      },
    },
  });
};

const getSinglePost = async (postId) => {
  if (!postId) throw new ResponseError(400, "Post id must be exists.");

  return prismaClient.post.findUnique({
    where: { postId },
    select: {
      postId: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          userId: true,
          username: true,
        },
      },
    },
  });
};

const createPost = async (request) => {
  const post = validate(createPostValidation, request);

  return prismaClient.post.create({
    data: post,
  });
};

const updatePost = async (request) => {
  const post = validate(updatePostValidation, request);

  const isPostExist = await prismaClient.post.findUnique({
    where: { postId: post.postId },
  });

  if (!isPostExist) throw new ResponseError(404, "Post not found");

  return prismaClient.post.update({
    where: { postId: post.postId },
    data: {
      title: post.title,
      content: post.content,
    },
  });
};

const deletePost = async (request) => {
  const post = validate(deletePostValidation, request);

  const isPostExist = await prismaClient.post.findUnique({
    where: { postId: post.postId },
  });

  if (!isPostExist) throw new ResponseError(404, "Post not found");

  return prismaClient.post.delete({
    where: { postId: post.postId },
  });
};

export default {
  getAllPosts,
  getUserPosts,
  searchPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
