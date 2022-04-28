const express = require("express");
const {
  createPost,
  updateOwnPost,
  deleteOwnPost,
  getFriendPost,
} = require("../controllers/post.controller");
const { loginRequired } = require("../middlewares/authentication");
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

module.exports = router;
