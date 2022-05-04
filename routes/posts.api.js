const express = require("express");
const { param } = require("express-validator");
const {
  createPost,
  updateOwnPost,
  deleteOwnPost,
  getFriendPost,
  getPostComments,
} = require("../controllers/post.controller");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

/**
 * @route POST /posts
 * @description Create a new post
 * @access Login required
 */
router.post("/create", loginRequired, createPost);

/**
 * @route POST /posts
 * @description Create a new post
 * @access Login required
 */
router.put("/:postId", loginRequired, updateOwnPost);

/**
 * @route POST /posts
 * @description Create a new post
 * @access Login required
 */
router.delete("/:postId", loginRequired, deleteOwnPost);

/**
 * @route POST /posts
 * @description Create a new post
 * @access Login required
 */
router.get("/", loginRequired, getFriendPost);
/**
 * @route POST /posts
 * @description Create a new post
 * @access Login required
 */
router.get(
  "/:id",
  loginRequired,
  validate([param("id").exists().isString().custom(checkObjectId)]),
  getPostComments
);

module.exports = router;
