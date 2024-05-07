import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validate from "../validation/validation.js";
import { registerValidation, loginValidation } from "../validation/auth-validation.js";
import prismaClient from "../application/database.js";
import ResponseError from "../error/response-error.js";

const register = async (request) => {
  const user = validate(registerValidation, request);

  const dupEmail = await prismaClient.user.count({ where: { email: user.email } });
  const dupUsername = await prismaClient.user.count({ where: { username: user.username } });

  if (dupEmail || dupUsername) {
    const message = dupEmail ? "Email already exists" : "Username already exists";
    throw new ResponseError(400, message);
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  delete user.confPassword;

  return prismaClient.user.create({
    data: user,
    select: {
      userId: true,
      username: true,
      name: true,
      email: true,
    },
  });
};

const login = async (request) => {
  const user = validate(loginValidation, request);

  const dbUser = await prismaClient.user.findUnique({
    where: { email: user.email },
    select: {
      userId: true,
      username: true,
      name: true,
      email: true,
      password: true,
    },
  });

  if (!dbUser) throw new ResponseError(400, "User not found");

  const validPassword = await bcrypt.compare(user.password, dbUser.password);
  if (!validPassword) throw new ResponseError(400, "Invalid email or password");
  delete dbUser.password;

  const accessToken = jwt.sign(dbUser, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  const refreshToken = jwt.sign(dbUser, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  await prismaClient.user.update({
    data: { refreshToken },
    where: { userId: dbUser.userId },
  });

  return {
    dbUser,
    accessToken,
    refreshToken,
  };
};

const logout = async (request) => {
  const { refreshToken } = request;
  if (!refreshToken) throw new ResponseError(400, "User not logged in");

  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  return prismaClient.user.update({
    data: { refreshToken: null },
    where: { userId: payload.userId },
  });
};

export default { register, login, logout };
