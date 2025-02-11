const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Email must be at least 5 characters long"],
      lowercase: true, 
      trim: true, 
    },
    password: {
      type: String,
      required: true,
      minlength: [3, "Password must be at least 6 characters long"],
    },
  },
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
