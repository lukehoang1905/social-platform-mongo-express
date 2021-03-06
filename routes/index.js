const express = require("express");
const router = express.Router();

/** User endpoints (UF) */
const userRouter = require("./users.api");
router.use("/users", userRouter);

/** Post endpoints (UF) */
const postRouter = require("./posts.api");
router.use("/posts", postRouter);

/** friend endpoints (UF) */
const friendRouter = require("./friends.api");
router.use("/friends", friendRouter);

/** comment endpoints (UF) */
const commentRouter = require("./comments.api");
router.use("/comments", commentRouter);

/** reaction endpoints (UF) */
const reactionRouter = require("./reactions.api");
router.use("/reactions", reactionRouter);

module.exports = router;
