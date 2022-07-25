const Post = require("../models/Post");
const PER_PAGE = 5; // số lượng posts xuất hiện trên 1 page

const getNewestPosts = async () => {
  return Post.find().sort({ datePosted: -1 }).limit(PER_PAGE);
};
const getMostReadPosts = async () => {
  return Post.find().sort({ viewCounts: -1 }).limit(PER_PAGE);
};
const getHome = async (req, res, next) => {
  const [messages] = req.flash("message") || null;
  const newestPosts = await getNewestPosts();
  const mostReadPosts = await getMostReadPosts();
  res.render("index", { messages, newestPosts, mostReadPosts });
};

module.exports = { getHome };
