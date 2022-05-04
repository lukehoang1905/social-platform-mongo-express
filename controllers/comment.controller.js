const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const commentController = {};

commentController.createNewComment = catchAsync(async (req, res, next) => {
  const { currentUserId } = req; //login requried middle
  const { content, postId } = req.body; //validate middle

  const post = await Post.findOne({ _id: postId });
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
commentController.updateComment = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const commentId = req.params.id;
  const { content } = req.body;

  let comment = await Comment.findOne({
    _id: commentId,
    author: currentUserId,
  });

  if (!comment) {
    throw new AppError(
      404,
      "Comment not found or Only author can update comment",
      "Update comment error"
    );
  }

  comment.content = content;
  comment = await comment.save();

  sendResponse(res, 200, true, comment, null, "successful");
});

commentController.deleteComment = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const commentId = req.params.id;

  let comment = await Comment.findOneAndDelete({
    _id: commentId,
    author: currentUserId,
  });

  if (!comment) {
    throw new AppError(
      404,
      "Comment not found or Only author can update comment",
      "Update comment error"
    );
  }

  sendResponse(res, 200, true, {}, null, "successful");
});

module.exports = commentController;
