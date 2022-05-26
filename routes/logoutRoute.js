const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/auth/logout", userController.getLogout);

module.exports = router;
