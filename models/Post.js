const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
  postId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: false, default: "highsocietvn" },
  datePosted: { type: String, required: true },
  viewCounts: { type: Number, required: true, default: 0 },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  imgs: { type: String, required: false },
  comments: { type: Array },
  tags: { type: Array },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
