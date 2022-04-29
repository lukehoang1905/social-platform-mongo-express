const express = require("express");
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
const router = express.Router();
// 1. Authenticated user can make friend request to other

router.post("/requests", loginRequired, makeFriendRequest);

// router.get("/users/me/friends", loginRequired, listOfFriend);
router.get("/requests/incoming", loginRequired, listOfReceive);
router.get("/requests/outgoing", loginRequired, listOfSent);

router.delete("/requests/cancel", loginRequired, cancelRequest);
router.put("/requests/:requestid", loginRequired, responseToRequest);

router.get("/me/all", loginRequired, listOfFriend);
router.delete("/unfriend/:userId", loginRequired, unfriend);

module.exports = router;
