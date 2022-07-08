module.exports = (req, res, next) => {
  if (req.user) {
    isLoggedIn = req.user;
  }
  next();
};
