const express = require("express");
const { body } = require("express-validator");
const { createNewComment } = require("../controllers/comment.controller");
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

module.exports = router;
