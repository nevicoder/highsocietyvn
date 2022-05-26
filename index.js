//initiate
require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const PORT = 3000;
//define routes
const homeRoute = require("./routes/homeRoute");
const postRoute = require("./routes/postRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const commentRoute = require("./routes/commentRoute");
app.use(
  session({ secret: "highsocietyvn", saveUninitialized: true, resave: true })
);
app.use(flash());

//config
app.set("view engine", "pug");
app.use(express.static("public"));
//routing
app.use("*", (req, res, next) => {
  userInfo = req.session.userInfo;
  next();
});
app.use(registerRoute);
app.use(loginRoute);
app.use(postRoute);
app.use(logoutRoute);
app.use(commentRoute);
app.use("/", homeRoute);
app.listen(process.env.PORT || PORT, () => console.log(`app is running...`));
