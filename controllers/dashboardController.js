const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postDashboardLogin = async (req, res, next) => {
  console.log("client connected");
  const username = await req.body.username;
  const password = await req.body.password;
  const user = await User.find({ username: username });
  if (!user) {
    res.json("Sai ten tai khoan");
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      if (user.role === admin) {
        const token = jwt.sign(
          {
            userId: user._id,
            username: user.username,
            avatar: user.avatar,
            isAdmin: user.role === "admin" ? true : false,
          },
          process.env.VITE_JWT_SECRET
        );
       json(token);
      } else {
        res.json("Khong phai la admin");
      }
    } else {
      res.json("Sai mat khau");
    }
  }
};
module.exports = postDashboardLogin;
