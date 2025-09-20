const dotenv = require("dotenv"); // Importing the dotenv library for environment variables
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library for JSON web token handling
const bcrypt = require("bcryptjs"); // Importing the bcryptjs library for password hashing
const User = require("../models/User"); // Importing the User model
dotenv.config(); // Loading environment variables from the .env file
const jwtSecret = process.env.JWT_SECRET; // Secret key for signing JWT
const bcryptSalt = bcrypt.genSaltSync(10); // Salt for password hashing

exports.userLogin = async (req, res) => {
  const { username, email, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
      jwt.sign(
        { userId: foundUser._id, username },
        jwtSecret,
        {},
        (err, token) => {
          // Creating a JWT token and setting it as a cookie in the response
          res.cookie("token", token, { sameSite: "none", secure: true }).json({
            id: foundUser._id,
          });
        }
      );
    }
  }
};
exports.userLogout = (req, res) => {
  res.cookie("token", "", { sameSite: "none", secure: true }).json("ok");
};

exports.regUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    // Loging new user using jwt
    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        // Creating a JWT token for the newly registered user and setting it as a cookie in the response
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({
            id: createdUser._id,
          });
      }
    );
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log(
        "Please cross the option and reload the server and then input the correct email and then again cross the option and reload the page to see data :("
      );
    }
    if (err) throw err;

    res.status(500).json("error");
  }
};
