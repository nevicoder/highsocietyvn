const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postDashboardLogin = async (req, res, next) => {
  console.log("client connected");
  console.log(req.body);

  const username = await req.body.username;
  const password = await req.body.password;
  console.log(username, password);
  const user = await User.findOne({ username: username });
  console.log(user);
  if (!user) {
    res.json("user");
  } else {
    res.send(user);
  }
};
module.exports = postDashboardLogin;
