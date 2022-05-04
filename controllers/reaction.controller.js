const mongoose = require("mongoose");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Reaction = require("../models/Reaction");

const reactionController = {};

reactionController.createReaction = catchAsync(async (req, res, next) => {
  const author = req.currentUserId;
  const { targetType, targetId, emoj } = req.body;

  const collectionName = mongoose.model(targetType);
  let targetObj = await collectionName.findOne({ _id: targetId });
  if (!targetObj) {
    throw new AppError(404, "Target not found", "Create reaction");
  }

  let reaction = await Reaction.findOne({
    targetType,
    targetId,
    author,
  });

  let message = "";

  if (!reaction) {
    await Reaction.create({ targetType, targetId, author, emoj });
  } else {
    if (reaction.emoj === emoj) {
      await reaction.delete();
      message = "delete reaction";
    } else {
      reaction.emoj = emoj;
      await reaction.save();
      message = "change reaction emoj";
    }
  }

  const reactions = await Reaction.find({
    targetType,
    targetId,
  });

  sendResponse(res, 200, true, reactions, null, message);
});

module.exports = reactionController;
