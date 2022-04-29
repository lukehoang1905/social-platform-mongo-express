const { catchAsync, sendResponse } = require("../helpers/utils");

const friendController = {};

friendController.makeFriendRequest = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, true, {}, null, "successful");
});

friendController.listOfFriend = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, true, {}, null, "successful");
});
friendController.responseToRequest = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, true, {}, null, "successful");
});
friendController.listOfReceive = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, true, {}, null, "successful");
});
friendController.listOfSent = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, true, {}, null, "successful");
});
friendController.cancelRequest = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, true, {}, null, "successful");
});
friendController.unfriend = catchAsync(async (req, res, next) => {
  return sendResponse(res, 200, true, {}, null, "successful");
});
module.exports = friendController;
