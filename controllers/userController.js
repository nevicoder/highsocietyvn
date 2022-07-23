const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getLogin = (req, res, next) => {
  res.render("login");
};
const postLogin = async (req, res, next) => {
  const username = await req.body.username;
  const password = await req.body.password;
  const user = await User.findOne({ username: username });
  console.log(user);
  if (!user) {
    console.log("Sai ten tai khoan");
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { userId: user._id, username: user.username, avatar: user.avatar },
        process.env.JWT_SECRET
      );
      res.cookie("userInfo", token);
      res.redirect("/");
    } else {
      console.log("Sai mat khau");
    }
  }
};
const getRegister = (req, res, next) => {
  res.render("register");
};
const postRegister = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const match = await User.findOne({ username: username });
  if (match) {
    res.redirect("/register");
  } else {
    const hash = bcrypt.hashSync(password, 10);
    await User.create({ username: username, password: hash });
    res.redirect("/");
  }
};
const getLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
module.exports = {
  getLogin,
  postLogin,
  getLogout,
  getRegister,
  postRegister,
};
