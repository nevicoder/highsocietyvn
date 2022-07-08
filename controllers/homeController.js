const getHome = (req, res, next) => {
  res.render("index", { user: req.user });
};

module.exports = getHome;
