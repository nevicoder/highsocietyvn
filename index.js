//packages
require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const passportFacebook = require("./configs/passportFacebook");
const uri = process.env.MONGODB_URI;
const User = require("./models/User");
const PORT = process.env.PORT;

//routes
const homeRoute = require("./routes/homeRoute");
const postRoute = require("./routes/postRoute");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const commentRoute = require("./routes/commentRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const authMiddleware = require("./middlewares/authMiddleware");
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));
app.use(
  session({ secret: "highsocietyvn", saveUninitialized: true, resave: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing

app.use(flash());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) =>
  User.findOne({ userId: user.userId }, (err, user) => done(err, user))
);
//config
app.set("view engine", "pug");
app.use(express.static("public"));

global.isLoggedIn = null;
app.get("*", authMiddleware);
app.use(loginRoute);
app.use(postRoute);
app.use(logoutRoute);
app.use(commentRoute);
app.use(categoriesRoute);
app.use("/", homeRoute);
app.listen(process.env.PORT || PORT, () => console.log(`app is running...`));
