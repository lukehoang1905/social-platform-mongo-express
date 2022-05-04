const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.ObjectId, required: true, ref: "Users" },
    post: { type: Schema.ObjectId, required: true, ref: "Posts" },
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comments", commentSchema);
module.exports = Comment;
