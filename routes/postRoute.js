const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/post/:postId", postController.getPost);
router.get("/posts/",postController.getPosts)
router.get("/posts/:page",postController.getPosts)
router.get("/admin/create-post", postController.getCreatePost);
router.post("/admin/create-post",postController.postCreatePost)

module.exports = router;
