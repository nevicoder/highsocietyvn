const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://nemanjavidic96:bestfriend4ever@cluster0.9auum.mongodb.net/hsv_blog?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

const Post = require("./models/Post");

async function sort() {
  const posts = await Post.find().sort({ datePosted: -1 });
  console.log(posts);
}

sort();
