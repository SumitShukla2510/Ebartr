const dotenv = require("dotenv"); // Importing the dotenv library for environment variables
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library for JSON web token handling
const User = require("../models/User"); // Importing the User model
const Message = require("../models/Message"); // Importing the Message model
const getUserDataFromRequest = require("../utils/reqUserData");
dotenv.config(); // Loading environment variables from the .env file
const jwtSecret = process.env.JWT_SECRET; // Secret key for signing JWT

exports.fetchAllMessages = async (req, res) => {
  const { userId } = req.params;
  const userData = await getUserDataFromRequest(req);
  // console.log("Hello");
  // console.log(userData);
  const ourUserId = userData.userId;
  // Fetching messages from the database based on sender and recipient IDs
  const messages = await Message.find({
    sender: { $in: [userId, ourUserId] },
    recipient: { $in: [userId, ourUserId] },
  }).sort({ createdAt: 1 });
  // console.log(messages);
  res.json(messages);
};

exports.fetchAllUsers = async (req, res) => {
  try {
    const userData = await getUserDataFromRequest(req);
    const ourUserId = userData.userId;

    const messages = await Message.find({
      $or: [{ sender: ourUserId }, { recipient: ourUserId }],
    }).sort({ createdAt: 1 });
    const uniqueUserIds = Array.from(
      new Set([
        ...messages.map((msg) => msg.sender),
        ...messages.map((msg) => msg.recipient),
      ])
    );
    const users = await User.find({ _id: { $in: uniqueUserIds } });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, { _id: 1, username: 1 });
  // { _id: 1, username: 1 }->we only want id and username
  res.json(users);
};

exports.fetchUser = (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    //can use asyn await also
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      // Verifying the JWT token and returning user data
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
};

exports.getUser = async (req, res) => {
  const userID = req.params.userID;
  const users = await User.find({_id:userID});
  res.json(users);
};
