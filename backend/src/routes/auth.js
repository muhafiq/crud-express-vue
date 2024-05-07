import express from "express";
import { login, register, logout } from "../controller/auth-controller.js";
import { refreshToken } from "../controller/token-controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.delete("/logout", logout);

authRouter.get("/token", refreshToken);

export default authRouter;
