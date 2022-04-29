const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Friend = require("../models/Friendship");
const { findById, find, findOneAndDelete } = require("../models/Friendship");
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
  const { currentUserId } = req;
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  let friendList = await Friend.find({
    $or: [{ from: currentUserId }, { to: currentUserId }],
    status: "accepted",
  });

  let friendIDs = friendList.map(({ from, to }) => {
    if (from.equals(currentUserId)) return to;
    return from;
  });

  const filterConditions = [{ _id: { $in: friendIDs } }];
  if (filter.name) {
    filterConditions.push({
      ["name"]: { $regex: filter.name, $options: "i" },
    });
  }
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await User.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const users = await User.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { users, totalPages },
    null,
    "successful"
  );
});

friendController.listOfReceive = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  let friendList = await Friend.find({
    to: currentUserId,
    status: "pending",
  });

  let requestorIds = friendList.map(({ from }) => from);

  const filterConditions = [{ _id: { $in: requestorIds } }];
  if (filter.name) {
    filterConditions.push({
      ["name"]: { $regex: filter.name, $options: "i" },
    });
  }
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await User.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const users = await User.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { users, totalPages },
    null,
    "successful"
  );
});

friendController.listOfSent = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  let friendList = await Friend.find({
    from: currentUserId,
    status: "pending",
  });

  let receiverIDs = friendList.map(({ to }) => to);

  const filterConditions = [{ _id: { $in: receiverIDs } }];
  if (filter.name) {
    filterConditions.push({
      ["name"]: { $regex: filter.name, $options: "i" },
    });
  }
  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await User.countDocuments(filterCriteria);
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const users = await User.find(filterCriteria)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { users, totalPages },
    null,
    "successful"
  );
});

friendController.responseToRequest = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { receiverId } = req.params;
  const { status } = req.body;

  let friendship = await Friend.findOne({
    to: currentUserId,
    from: receiverId,
    status: "pending",
  });

  if (!friendship) {
    throw new AppError(
      400,
      "Friend Request not found",
      "Response to friend request"
    );
  }
  friendship.status = status;
  friendship = await friendship.save();

  return sendResponse(res, 200, true, friendship, null, "successful");
});

friendController.cancelRequest = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { receiverId } = req.body;

  const friendship = await Friend.findOneAndDelete({
    from: currentUserId,
    to: receiverId,
    status: "pending",
  });
  console.log(friendship, "here");
  if (!friendship) {
    throw new Error(401, "Can not find friend request", "Cancel request error");
  }
  return sendResponse(res, 200, true, {}, null, "successful");
});

friendController.unfriend = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { receiverId } = req.params;

  const friendship = await Friend.findOneAndDelete({
    $or: [
      {
        from: currentUserId,
        to: receiverId,
        status: "accepted",
      },
      { from: receiverId, to: currentUserId, status: "accepted" },
    ],
  });
  if (!friendship) {
    throw new Error(401, "Can not find friend request", "Cancel request error");
  }

  return sendResponse(res, 200, true, {}, null, "successful");
});

module.exports = friendController;
