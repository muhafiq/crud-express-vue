import prismaClient from "../application/database.js";
import jwt from "jsonwebtoken";
import ResponseError from "../error/response-error.js";

const refreshToken = async (requestCookie) => {
  const refreshToken = requestCookie.refreshToken;

  if (!refreshToken) throw new ResponseError(403, "Refresh token is required.");

  const user = await prismaClient.user.findMany({
    where: { refreshToken: refreshToken },
  });

  if (!user[0]) throw new ResponseError(403, "Invalid refresh token.");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
    if (error) throw new ResponseError(403, "An error occurred while verifying the refresh token.");
  });

  const payload = {
    userId: user[0].userId,
    username: user[0].username,
    name: user[0].name,
    email: user[0].email,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });

  return accessToken;
};

export default {
  refreshToken,
};
