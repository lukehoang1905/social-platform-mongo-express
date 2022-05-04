const express = require("express");
const { body, param } = require("express-validator");
const { createReaction } = require("../controllers/reaction.controller");

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
    body("targetId").exists().isString().custom(checkObjectId),
    body("targetType").exists().isString(),
  ]),
  createReaction
);
module.exports = router;
