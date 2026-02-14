const express = require("express");
const cors = require("cors");
const pool = require("./db");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const joinRoutes = require("./routes/joinrequests");
const taskRoutes = require("./routes/tasks");
const ratingRoutes = require("./routes/ratings");
const githubRoutes = require("./routes/github");
const messageRoutes = require("./routes/messages");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/messages", messageRoutes);

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store connected users
let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Existing feature
  socket.on("registerUser", (userId) => {
    users[userId] = socket.id;
  });

  // Join project chat room
  socket.on("joinProjectRoom", (projectId) => {
    socket.join(`project_${projectId}`);
  });

  // ⭐ UPDATED — Send message WITH username
  socket.on("sendMessage", async ({ projectId, userId, message }) => {
    try {
      // Save message to DB
      await pool.query(
        "INSERT INTO messages (project_id, user_id, message) VALUES ($1,$2,$3)",
        [projectId, userId, message]
      );

      // Get username from users table
      const user = await pool.query(
        "SELECT name FROM users WHERE id=$1",
        [userId]
      );

      // Emit message with username
      io.to(`project_${projectId}`).emit("newMessage", {
        userId,
        username: user.rows[0].name,
        message,
      });

    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.set("io", io);
app.set("users", users);
const matchRoutes = require("./routes/match");
app.use("/api/match", matchRoutes);
// Use dynamic port for Render
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
