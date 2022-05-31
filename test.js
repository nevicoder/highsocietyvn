// const mongoose = require("mongoose");
// const User = require("./models/User");
// mongoose.connect(
//   `mongodb+srv://nemanjavidic96:bestfriend4ever@cluster0.9auum.mongodb.net/hsv_blog?retryWrites=true&w=majority`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else console.log("connected");
//   }
// );
// User.find({}, (err, users) => console.log(users));
// // const Schema = mongoose.Schema;
// // const UserSchema = new Schema({
// //   userId: { type: Number, unique: true, required: true },
// //   username: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   role: { type: String, required: false, unique: false, default: "user" },
// // });

const Post = require("./models/Post");

// // const User = mongoose.model("User", UserSchema);
// // User.find({}, (err, users) => console.log(users));
// // User.create(
// //   {
// //     userId: 5,
// //     username: "dasdsa",
// //     password: "dasdas",
// //     role: "user",
// //   },
// //   (err, user) => {
// //     if (err) console.log(err);
// //   }
// // );
console.log(
  Post.findById("629584044592332525c82327", (err, post) => console.log(post.tags))
);
console.log("lsd,shroom, ayahuasca".split(","));
