const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    // _id: { type: Schema.Types.ObjectId, ref: "Posts" },
    author: { type: Schema.Types.ObjectId, ref: "Users", required: true }, //_id
    content: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: String, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
