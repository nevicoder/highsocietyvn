const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userId: { type: Number, unique: true, required: true },
  name: { type: String, required: true, unique: true },
  avatar:{type:String,required:true},
  role: { type: String, required: false, unique: false, default: "user" },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
