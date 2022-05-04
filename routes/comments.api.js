const express = require("express");
const { body, param } = require("express-validator");
const {
  createNewComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

/**
 * @route POST /posts
 * @description Create a new comment
 * @access Login required
 */
router.post(
  "/create",
  loginRequired,
  validate([
    body("postId").exists().isString().custom(checkObjectId),
    body("content").exists().isString(),
  ]),
  createNewComment
);

/**
 * @route POST /posts
 * @description Create a new comment
 * @access Login required
 */
router.put(
  "/:id",
  loginRequired,
  validate([
    param("id").exists().isString().custom(checkObjectId),
    body("content").exists().isString(),
  ]),
  updateComment
);

/**
 * @route POST /posts
 * @description Create a new comment
 * @access Login required
 */
router.delete(
  "/:id",
  loginRequired,
  validate([param("id").exists().isString().custom(checkObjectId)]),
  deleteComment
);
module.exports = router;
