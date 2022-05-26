const User = require("../models/User");
const bcrypt = require("bcrypt");

const postRegister = (req, res, next) => {
  const body = req.body;

  User.findOne({}, {}, { sort: { userId: -1 } }, function (err, user) {
    const lastedId = user.userId + 1 || 0;
    User.create(
      {
        userId: lastedId,
        username: body.username__input,
        password: bcrypt.hashSync(body.pwd__input, 10),
      },
      async (err, user) => {
        if (err) {
          await req.flash("existedUsername", true);
          await req.flash("username", err.keyValue.username);
          res.redirect("/register");
        } else {
          await req.flash("registered", true);
          res.redirect("/");
        }
      }
    );
  });
};
const getRegister = (req, res, next) => {
  const [existedUsername] = req.flash("existedUsername");
  if (existedUsername) {
    const [username] = req.flash("username");
    res.render("register", { existed: true, username: username });
  } else {
    res.render("register");
  }
};
const getLogin = (req, res, next) => {
  const [wrongInfo] = req.flash("wrongInfo");
  const [wrongUsername] = req.flash("wrongUsername");
  const [wrongPwd] = req.flash("wrongPwd");
  if (wrongInfo) {
    if (wrongUsername) {
      res.render("login", { wrongUsername: wrongUsername });
    }
    if (wrongPwd) {
      res.render("login", { wrongPwd: wrongPwd });
    }
  } else {
    res.render("login");
  }
};

const postLogin = async (req, res, next) => {
  const username = req.body.username__input;
  const password = req.body.pwd__input;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, async (err, same) => {
        if (same) {
          req.flash("signedIn", true);
          req.session.userInfo = user;
          res.redirect("/");
        } else {
          req.flash("wrongInfo", true);
          req.flash("wrongPwd", true);

          res.redirect("/login");
        }
      });
    } else {
      req.flash("wrongInfo", true);
      req.flash("wrongUsername", true);

      res.redirect("/login");
    }
  });
};

const getLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
module.exports = { getRegister, postRegister, getLogin, postLogin, getLogout };
