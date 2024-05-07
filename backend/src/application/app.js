import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import errorMiddleware from "../middleware/error-middleware.js";
import ResponseError from "../error/response-error.js";

import authRouter from "../routes/auth.js";
import postRouter from "../routes/post.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);

app.all("/*", (req, res, next) => {
  next(new ResponseError(404, "Nothing here!"));
});

app.use(errorMiddleware);

export default app;
