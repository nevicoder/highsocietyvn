const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

router.post("/auth/register",redirectMiddleware,userController.postRegister)
router.get("/register",redirectMiddleware,userController.getRegister)
module.exports = router;