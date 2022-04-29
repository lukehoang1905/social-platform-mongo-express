switch (friendship.status) {
  case "pending":
    if (friendship.to.equals(receiverId)) {
      throw new AppError(
        400,
        "You have already sent a request to this user",
        "Make friend request error"
      );
    } else {
      throw new AppError(
        400,
        "You have already received an request from this user",
        "Make friend request error"
      );
    }
  case "accepted":
    throw new AppError(
      400,
      "Users are already friend",
      "Make friend request error"
    );
  case "declined":
    friendship.from = requestorId;
    friendship.to = receiverId;
    friendship.status = "pending";
    await friendship.save();
    return sendResponse(
      res,
      200,
      true,
      friendship,
      null,
      "Request has been sent"
    );

  default:
    throw new AppError(400, "Friend status undefined", "Add Friend Error");
}
