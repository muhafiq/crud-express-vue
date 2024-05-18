import expressAsyncHandler from "../error/express-async-handler.js";
import ResponseError from "../error/response-error.js";
import postService from "../service/post-service.js";

export const getAllPosts = expressAsyncHandler(async (req, res, next) => {
  const result = await postService.getAllPosts();

  if (result instanceof ResponseError || !result) throw result;

  res.status(200).json({
    code: 200,
    message: "All posts",
    data: result,
  });
});

export const getUserPosts = expressAsyncHandler(async (req, res, next) => {
  const result = await postService.getUserPosts(req.params.userId);

  if (result instanceof ResponseError || !result) throw result;

  res.status(200).json({
    code: 200,
    message: "User posts",
    data: result,
  });
});

export const searchPosts = expressAsyncHandler(async (req, res, next) => {
  const result = await postService.searchPosts(req.query.q);

  if (result instanceof ResponseError || !result) throw result;

  res.status(200).json({
    code: 200,
    message: "Search posts",
    data: result,
  });
});

export const getSinglePost = expressAsyncHandler(async (req, res, next) => {
  const result = await postService.getSinglePost(req.params.postId);

  if (result instanceof ResponseError || !result) throw result;

  res.status(200).json({
    code: 200,
    message: "Single post",
    data: result,
  });
});

export const createPost = expressAsyncHandler(async (req, res, next) => {
  const result = await postService.createPost({
    ...req.body,
    authorId: req.user.userId,
  });

  if (result instanceof ResponseError || !result) throw result;

  res.status(201).json({
    code: 201,
    message: "Post created",
    data: result,
  });
});

export const updatePost = expressAsyncHandler(async (req, res, next) => {
  const result = await postService.updatePost({
    ...req.body,
    postId: req.params.postId,
  });

  if (result instanceof ResponseError || !result) throw result;

  res.status(200).json({
    code: 200,
    message: "Post updated",
    data: result,
  });
});

export const deletePost = expressAsyncHandler(async (req, res, next) => {
  const result = await postService.deletePost({ postId: req.params.postId });

  if (result instanceof ResponseError || !result) throw result;

  res.status(200).json({
    code: 200,
    message: "Post deleted",
    data: [],
  });
});
