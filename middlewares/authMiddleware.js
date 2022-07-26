const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.userInfo;
  if (token) {
    const info = jwt.verify(token, process.env.JWT_SECRET);
    global.loggedIn = info;
    console.log(loggedIn);
  }
  next();
};
