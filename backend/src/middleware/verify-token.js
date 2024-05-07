import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ResponseError from "../error/response-error.js";
dotenv.config();

export default (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) throw new ResponseError(401, "Unauthorized");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      throw new ResponseError(
        403,
        "Access token is not valid or has expired. Please log in again."
      );
    }
    req.user = decoded;
    next();
  });
};
