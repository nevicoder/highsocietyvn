const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/post/:postId/comment", postController.postComment);
router.post("/post/:postId/comment/:commentId/replies", postController.postReply);
module.exports = router;