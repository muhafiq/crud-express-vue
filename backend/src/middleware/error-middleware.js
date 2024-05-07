import ResponseError from "../error/response-error.js";

export default (error, req, res, next) => {
  if (error instanceof ResponseError) {
    return res
      .status(error.code)
      .json({
        code: error.code,
        message: error.message,
        error: true,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        code: error.code || 500,
        message: error.message || "An error occurred",
        error: true,
      })
      .end();
  }
};
