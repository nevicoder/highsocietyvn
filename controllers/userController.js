const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getLogin = (req, res, next) => {
  const [messages] = req.flash("message") || null;
  console.log(messages);
  res.render("login", { messages });
};
const postLogin = async (req, res, next) => {
  const username = await req.body.username;
  const password = await req.body.password;
  const user = await User.findOne({ username: username });
  if (!user) {
    req.flash("message", "Sai tên tài khoản");
    res.redirect("/login");
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          avatar: user.avatar,
          isAdmin: user.role === "admin" ? true : false,
        },
        process.env.JWT_SECRET
      );
      res.cookie("userInfo", token);
      req.flash("message", `Chào ${username}`);
      res.redirect("/");
    } else {
      req.flash("message", "Sai mật khẩu");
      res.redirect("/login");
    }
  }
};
const getRegister = (req, res, next) => {
  const [messages] = req.flash("message") || undefined;
  res.render("register", { messages });
};
const postRegister = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const match = await User.findOne({ username: username });
  if (match) {
    req.flash("message", `Tên tài khoản ${username} đã tồn tại`);
    res.redirect("/register");
  } else {
    const hash = bcrypt.hashSync(password, 10);
    await User.create({ username: username, password: hash });
    req.flash("message", `Đăng kí thành công`);
    res.redirect("/login");
  }
};
const getLogout = (req, res, next) => {
  res.clearCookie("userInfo");
  global.loggedIn = null;
  res.redirect("/");
};
module.exports = {
  getLogin,
  postLogin,
  getLogout,
  getRegister,
  postRegister,
};
