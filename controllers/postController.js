const mongoose = require("mongoose");
const Post = require("../models/Post");

function generatePostTitle(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
  str = str.replace(/Đ/g, "d");
  // Some system encode  vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );
  return str.split(" ").join("-").toLowerCase();
}
const getPost = (req, res, next) => {
  const params = req.params;
  console.log(params);
  Post.find({ postId: params.postId }, (err, post) => {
    if (err) console.log(err);
    else {
      const [currentPost] = post;
      const newViewCounts = currentPost.viewCounts + 1;
      res.render("post", { post: currentPost, comments: currentPost.comments });

      console.log(post);
      Post.findOneAndUpdate(
        { title: currentPost.title },
        { viewCounts: newViewCounts },
        (err, post) => console.log(post)
      );
    }
  });
};
const getPosts = async (req, res, next) => {
  const perPage = 5; // số lượng sản phẩm xuất hiện trên 1 page
  const page = req.params.page || 1;
  const pages = await Post.count();
  const posts = await Post.find() // find tất cả các data
    .skip((page - 1) * perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage);
  res.render("posts", {
    current: page,
    posts,
    pages: Math.ceil(pages / perPage),
  });
};

const getCreatePost = (req, res, next) => {
  if (userInfo && userInfo.role === "admin") res.render("create-post");
  else res.status(304).send("Not allowed");
};

const postCreatePost = async (req, res, next) => {
  const body = req.body;
  let today = new Date();
  datePosted =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  console.log(typeof datePosted);
  Post.create(
    {
      postId: await generatePostTitle(body.post__title),
      title: body.post__title,
      content: body.post__content.replace(new RegExp("\r?\n", "g"), "<br/>"),
      thumbnail: body.post__thumbnail,
      imgs: body.post__imgs,
      datePosted: datePosted,
    },
    async (err, post) => {
      if (err) console.log(err);
      console.log(post);
    }
  );
  res.redirect("/posts");
};

const postComment = (req, res, next) => {
  const { postId } = req.params;
  if (userInfo) {
    Post.findOne({ postId: postId }, async (err, post) => {
      const commentList = await post.comments;
      const comment = await req.body.comment__content;
      await commentList.push({ user: userInfo.username, content: comment });
      await Post.findOneAndUpdate(
        { postId: postId },
        { comments: commentList }
      );
      console.log(commentList);
      console.log(post);
      res.redirect(`/post/${postId}`);
    });
  } else {
    res.redirect("/login");
  }
};
module.exports = {
  getPost,
  getPosts,
  getCreatePost,
  postCreatePost,
  postComment,
};
