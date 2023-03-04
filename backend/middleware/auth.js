const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (token == null ) {
    return next(new ErrorHandler("Please, login to Access this Resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);


  req.user = await User.findById(decodedData.id);

  next();
});

exports.forRoutineCheck = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  // console.log('Cookies: ', req.cookies)

  // console.log('token :>> ', token);

  if (!token) {
    return next(new ErrorHandler("err123", 401))
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);


  req.user = await User.findById(decodedData.id);

  next();
});
