import { HttpStatusCode } from "#interfaces/global.js";

const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
}

const errorHandler = (err, req, res, next) => {
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    stack: err.stack,
  });
}

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output: { statusCode, payload } } = err;
    res.status(statusCode).json(payload);
  }

  next(err);
}

export {
  logErrors,
  errorHandler,
  boomErrorHandler,
}
