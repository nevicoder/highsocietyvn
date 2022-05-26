const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/post/:postId/comment", postController.postComment);
module.exports = router;