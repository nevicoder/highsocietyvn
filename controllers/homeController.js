const getHome = (req, res, next) => {
  const [registered] = req.flash("registered");
  const [signedIn] = req.flash("signedIn");
  if (userInfo) {
    console.log(userInfo);
    if (signedIn) {
      res.render("index", {
        signedIn: true,
        loggedIn: true,
        userInfo: userInfo,
      });
    } else {
      res.render("index", { loggedIn: true });
    }
  } else if (registered) {
    res.render("index", { registered: true });
  } else {
    res.render("index");
  }
};

module.exports = getHome;
