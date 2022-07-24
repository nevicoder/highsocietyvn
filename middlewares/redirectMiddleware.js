module.exports = function redirectIfAuthenticated(req, res, next) {
  if (loggedIn) {
    return res.redirect("/");
  }
  next();
};
