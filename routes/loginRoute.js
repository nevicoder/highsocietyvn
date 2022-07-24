const express = require("express");
const passport = require("passport");
const router = express.Router();
const redirectMiddleware = require("../middlewares/redirectMiddleware");
const userController = require("../controllers/userController");
router.get("/login", redirectMiddleware, userController.getLogin);
router.post("/auth/login", redirectMiddleware, userController.postLogin);

module.exports = router;
