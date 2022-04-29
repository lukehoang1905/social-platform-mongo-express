const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Friend = require("../models/Friendship");
const { findById } = require("../models/Friendship");
const User = require("../models/User");

const friendController = {};

friendController.makeFriendRequest = catchAsync(async (req, res, next) => {
  const requestorId = req.currentUserId;
  const receiverId = req.body.to;
  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new AppError(404, "User not found", "Make friend request error");
  }

  let friendship = await Friend.findOne({
    $or: [
      { from: requestorId, to: receiverId },
      { from: receiverId, to: requestorId },
    ],
  });

  if (!friendship) {
    friendship = await Friend.create({
      from: requestorId,
      to: receiverId,
      status: "pending",
    });
  } else if (friendship.status === "declined") {
    friendship.from = requestorId;
    friendship.to = receiverId;
    friendship.status = "pending";
    await friendship.save();
  } else {
    throw new AppError(
      400,
      "Friend request already sent",
      "Make friend request error"
    );
  }
  return sendResponse(
    res,
    200,
    true,
    friendship,
    null,
    "Make friend request successful"
  );
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
