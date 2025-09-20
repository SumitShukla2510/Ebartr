const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please Type the Username you wanted"],
      trim: true,
      maxlength: [20, "A username must have less or equal then 20 characters"],
      minlength: [3, "A username must have more or equal then 3 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Type the Email"],
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please Type the Password"],
      minlength: [8, "Minimum Length of password should be 8 characters"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
