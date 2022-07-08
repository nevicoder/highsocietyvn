const express = require("express");
const passport = require("passport");
const router = express.Router();
const redirectMiddleware = require("../middlewares/redirectMiddleware");
const userController = require("../controllers/userController");
router.get("/login", redirectMiddleware, userController.getLogin);
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
