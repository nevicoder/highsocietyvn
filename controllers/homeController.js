const getHome = (req, res, next) => {
  const [messages] = req.flash("message") || null;

  res.render("index", { messages });
};

module.exports = getHome;
