import expressAsyncHandler from "../error/express-async-handler.js";
import ResponseError from "../error/response-error.js";
import authService from "../service/auth-service.js";
import dotenv from "dotenv";
dotenv.config();

export const register = expressAsyncHandler(async (req, res, next) => {
  const result = await authService.register(req.body);

  if (result instanceof ResponseError) throw result;

  res.status(201).json({
    code: 201,
    message: "User created",
    data: result,
  });
});

export const login = expressAsyncHandler(async (req, res, next) => {
  const result = await authService.login(req.body);

  if (result instanceof ResponseError) throw result;

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    code: 200,
    message: "User logged in",
    accessToken: result.accessToken,
    data: result.dbUser,
  });
});

export const logout = expressAsyncHandler(async (req, res, next) => {
  const result = await authService.logout(req.cookies);

  if (result instanceof ResponseError) throw result;

  res.clearCookie("refreshToken");
  res.status(200).json({
    code: 200,
    message: "User logged out",
  });
});
