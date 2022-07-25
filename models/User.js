const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "avatar.jpg",
  },
  role: { type: String, default: "user" },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
