const bcrypt = require("bcryptjs");
const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const User = require("../models/User");

const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    throw new AppError(409, "User already exists", "Register Error");
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await User.create({
    name,
    email,
    password,
  });

  const accessToken = user.generateToken();

  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
});

userController.loginEmailPassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "+password");

  if (!user) {
    throw new AppError(400, "Wrong password", "Login Error");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Invalid credentials", "Login Error");
  }

  const accessToken = user.generateToken();
  return sendResponse(res, 200, { user, accessToken }, null, "successful");
});

userController.getAllUsers = catchAsync(async (req, res, next) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const count = await User.countDocuments({ isDeleted: false });
  const totalPage = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  let userList = await User.find({ isDeleted: false })
    .sort({ createAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(res, 200, { userList, totalPage }, null, "successful");
});
userController.getSingleUserById = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, {}, null, "successful");
});
userController.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, {}, null, "successful");
});
userController.updateCurrentUser = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, {}, null, "successful");
});
userController.deactivateCurrentUser = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, {}, null, "successful");
});

module.exports = userController;
