import expressAsyncHandler from "../error/express-async-handler.js";
import tokenService from "../service/token-service.js";
import ResponseError from "../error/response-error.js";

export const refreshToken = expressAsyncHandler(async (req, res, next) => {
  const result = await tokenService.refreshToken(req.cookies);

  if (result instanceof ResponseError) throw result;

  res.status(200).json({
    code: 200,
    message: "Token refreshed",
    accessToken: result,
  });
});
