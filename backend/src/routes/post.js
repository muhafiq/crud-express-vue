import express from "express";
import verifyToken from "../middleware/verify-token.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  searchPosts,
  updatePost,
} from "../controller/post-controller.js";

const postRouter = express.Router();

postRouter.use(verifyToken);

postRouter.get("/all", getAllPosts);

postRouter.get("/search", searchPosts);

postRouter.get("/:userId", getUserPosts);

postRouter.post("/create", createPost);

postRouter.put("/edit/:postId", updatePost);

postRouter.delete("/delete/:postId", deletePost);

export default postRouter;
