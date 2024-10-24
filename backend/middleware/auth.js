const jwt = require("jsonwebtoken");
const asyncHandler = require("./catchAsyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const userModel = require("../models/userModel");

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodedData.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }

  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource.`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  isAuthenticatedUser,
  authorizeRoles
};
