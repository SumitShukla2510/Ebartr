const dotenv = require("dotenv"); // Importing the dotenv library for environment variables
const jwt = require("jsonwebtoken");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
// Function to extract user data from the request using JWT
async function getUserDataFromRequest(req) {
    return new Promise((resolve, reject) => {
      const token = req.cookies?.token;//optional chaining 
      if (token) {
        // although empty object here contains token expire time but we did not want token to expire
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          // Verifying the JWT token and extracting user data
          if (err) throw err;
          resolve(userData);
        });
      } else {
        reject("no token");
      }
    });
  }
  module.exports = getUserDataFromRequest;