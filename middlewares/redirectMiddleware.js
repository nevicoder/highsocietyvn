module.exports = function redirectIfAuthenticated(req, res, next) {
  if (req.user) {
    return res.redirect("/");
  }
  next();
};
