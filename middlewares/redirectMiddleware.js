module.exports = function redirectIfAuthenticated(req, res, next) {
  if (req.session.userId) {
    return res.redirect("/");
  }
  next();
};
