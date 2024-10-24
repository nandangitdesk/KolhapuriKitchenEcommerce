const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongoId error
  if (err.name == "castError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  
  //duplication error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} is entered`
    err = new ErrorHandler(message,400)
  }

  //Json web token error
  if (err.code === "JsonWebTokenError") {
    const message = "Json web token is invalid,try again"
    err = new ErrorHandler(message,400)
  }

  //Token Expired Error
  if (err.code === "TokenExpiredError") {
    const message = "Json web token is expired,try again"
    err = new ErrorHandler(message,400)
  }



  res.status(err.statusCode).json({
    success: false,
    message: err.message, // Send only the error message, not the entire error object
  });
};
