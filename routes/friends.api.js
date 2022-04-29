const express = require("express");
const { body, param } = require("express-validator");
const {
  makeFriendRequest,
  listOfFriend,
  responseToRequest,
  listOfSent,
  listOfReceive,
  cancelRequest,
  unfriend,
} = require("../controllers/friend.controller");
const { loginRequired } = require("../middlewares/authentication");
const {
  checkObjectId,
  validate,
  statusValueCheck,
} = require("../middlewares/validator");

const router = express.Router();
// 1. Authenticated user can make friend request to other

router.post(
  "/requests",
  loginRequired,
  validate([body("to").exists().isString().custom(checkObjectId)]),
  makeFriendRequest
);

// router.get("/users/me/friends", loginRequired, listOfFriend);
router.get("/requests/incoming", loginRequired, listOfReceive);
router.get("/requests/outgoing", loginRequired, listOfSent);

router.delete("/requests/cancel", loginRequired, cancelRequest);

router.put(
  "/requests/:receiverid",
  validate([
    param("receiverid").exists().isString().custom(checkObjectId),
    body("status").exists().isString().custom(statusValueCheck),
  ]),
  loginRequired,
  responseToRequest
);
// router.put("/requests/:userId", loginRequired, responseToRequest);

router.get("/me/all", loginRequired, listOfFriend);
router.delete("/unfriend/:receiverId", loginRequired, unfriend);

module.exports = router;
