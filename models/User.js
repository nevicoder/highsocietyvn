const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg",
  },
  role: { type: String,default: "user" },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
