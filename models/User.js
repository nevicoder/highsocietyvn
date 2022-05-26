const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false, unique: false, default: "user" },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
