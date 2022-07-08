const getLogin = (req, res, next) => {
  res.render("login");
};

const getLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
module.exports = {
  getLogin,
  getLogout,
};
