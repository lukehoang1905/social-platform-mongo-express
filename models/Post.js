const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId, //"objectId 626a1763823bfa06c22dc2d2"
      required: true,
      ref: "Users",
    },
    content: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: String, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
