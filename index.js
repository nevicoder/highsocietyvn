//packages
require("dotenv").config();
const express = require("express");
const app = express();
const flash = require("connect-flash");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const session = require("express-session");
const cors = require("cors");

//routes
const homeRoute = require("./routes/homeRoute");
const postRoute = require("./routes/postRoute");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const logoutRoute = require("./routes/logoutRoute");
const commentRoute = require("./routes/commentRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const authMiddleware = require("./middlewares/authMiddleware");
const dashBoardRoute = require("./routes/dashboardRoute");
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));
app.use(
  cors({
    origin: "*",
    methods: ["POST"],
  })
);
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing
app.use(
  session({
    secret: "highsocietyvn",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.use(flash());
global.loggedIn = undefined;
//config
app.set("view engine", "pug");
app.use(express.static("public"));

app.get("*", authMiddleware);
app.use("/", homeRoute);
app.use(dashBoardRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(postRoute);
app.use(logoutRoute);
app.use(commentRoute);
app.use(categoriesRoute);
app.listen(process.env.PORT || PORT, () => console.log(`app is running...`));
