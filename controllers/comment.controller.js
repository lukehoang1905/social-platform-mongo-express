const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const commentController = {};

commentController.createNewComment = catchAsync(async (req, res, next) => {
  const { currentUserId } = req; //login requried middle
  const { content, postId } = req.body; //validate middle

  const post = await Post.findOne({ _id: postId, isDeleted: false });
  if (!post) {
    throw new AppError(404, "Post not found", "Create comment error");
  }

  let comment = await Comment.create({
    author: currentUserId,
    post: postId,
    content,
  });

  sendResponse(res, 200, true, comment, null, "successful");
});
commentController.x = catchAsync(async (req, res, next) => {
  sendResponse(res, 200, true, {}, null, "successful");
});
commentController.x = catchAsync(async (req, res, next) => {
  sendResponse(res, 200, true, {}, null, "successful");
});
commentController.x = catchAsync(async (req, res, next) => {
  sendResponse(res, 200, true, {}, null, "successful");
});
module.exports = commentController;
