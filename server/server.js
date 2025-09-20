const dotenv = require("dotenv"); // Importing the dotenv library for environment variables
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library for JSON web token handling
const app = require("./app");
const Message = require("./models/Message"); // Importing the Message model
const ws = require("ws"); // Importing the WebSocket library
const fs = require("fs"); // Importing the fs module for file system operations
const cors = require("cors");

dotenv.config(); // Loading environment variables from the .env file
const jwtSecret = process.env.JWT_SECRET; // Secret key for signing JWT
const port = process.env.PORT || 4040;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const wss = new ws.WebSocketServer({ server });

// WebSocket connection handling
wss.on("connection", (connection, req) => {
  function notifyAboutOnlinePeople() {
    [...wss.clients].forEach((client) => {
      // Sending a message to all connected clients with the list of online users
      client.send(
        JSON.stringify({
          online: [...wss.clients].map((c) => ({
            userId: c.userId,
            username: c.username,
          })),
        })
      );
    });
  }

  // for offline/online connection purpose
  connection.isAlive = true;

  // Set up a timer to send periodic pings to the connection
  connection.timer = setInterval(() => {
    connection.ping();

    // Set a timeout to terminate the connection if it becomes unresponsive
    connection.deathTimer = setTimeout(() => {
      // Mark the connection as unresponsive
      connection.isAlive = false;

      // Clear the interval timer for pinging
      clearInterval(connection.timer);

      // Terminate the connection
      connection.terminate();

      // Notify about online people
      notifyAboutOnlinePeople();

      // Log that the connection is dead
      console.log("dead");
    }, 1000);
  }, 5000);

  // Listen for a "pong" event indicating a successful response to the ping
  connection.on("pong", () => {
    // Clear the death timer, as the connection is responsive
    clearTimeout(connection.deathTimer);
  });

  // Read the username and ID from the cookie for this connection
  const cookies = req.headers.cookie;
  if (cookies) {
    // Find the token cookie string
    const tokenCookieString = cookies
      .split(";")
      .find((str) => str.startsWith("token="));

    if (tokenCookieString) {
      // Extract the token from the cookie string
      const token = tokenCookieString.split("=")[1];

      if (token) {
        // Verify the JWT token and extract user data
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) throw err;

          // Extract the userId and username from the user data
          const { userId, username } = userData;

          // Store the userId and username in the connection object
          connection.userId = userId;
          connection.username = username;
        });
      }
    }
  }

  connection.on("message", async (message) => {
    const messageData = JSON.parse(message.toString()); //converting the buffer message into actual message
    const { recipient, text, file } = messageData;
    let filename = null;
    if (file) {
      const parts = file.name.split(".");
      const ext = parts[parts.length - 1];
      filename = Date.now() + "." + ext;
      const path = __dirname + "/uploads/" + filename;
      const bufferData = Buffer.from(file.data.split(",")[1], "base64");
      fs.writeFile(path, bufferData, (error) => {
        if (error) {
          console.error("Error saving file:", error);
        } else {
          console.log("File saved:", path);
        }
      });
    }
    if (recipient && (text || file)) {
      const messageDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text,
        file: file ? filename : null,
      });
      // Creating a new message in the database and sending it to the recipient(s)
      [...wss.clients]
        .filter((c) => c.userId === recipient)
        .forEach((c) =>
          c.send(
            JSON.stringify({
              text,
              sender: connection.userId,
              recipient,
              file: file ? filename : null,
              _id: messageDoc._id,
            })
          )
        );
    }
  });

  // Notifying everyone about online people (when someone connects)
  notifyAboutOnlinePeople();
});
