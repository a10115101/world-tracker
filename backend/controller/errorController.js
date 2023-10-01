const { CastError } = require("mongoose");
const AppError = require("../utilities/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "server error";

  if (err instanceof CastError) err = handleCastErrorDB(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
