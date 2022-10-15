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
  console.log(username, password);
  const user = await User.findOne({ username: username });
  if (!user) {
    // req.flash("message", "Sai tên tài khoản");
    // res.redirect("/login");
    res.json({
      message: "wrong username",
    });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          avatar: user.avatar,
          isAdmin: user.role === "admin",
        },
        process.env.JWT_SECRET
      );
      console.log(token);
      // res.cookie("token", token);
      res.json({
        message: "logged In",
        token,
        user: { id: user._id, username: user.username },
      });

      // // req.flash("message", `Chào ${username}`);
      // // res.redirect("/");
    } else {
      res.json({
        message: "wrong password",
      });
      // req.flash("message", "Sai mật khẩu");
      // res.redirect("/login");
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
    res.json({ message: "Ten tai khoan da ton tai" });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    await User.create({
      username: username,
      password: hash,
      avatar: "",
      role: "user",
    });
    // req.flash("message", `Đăng kí thành công`);
    res.json({ message: "Registered successfully" });
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
