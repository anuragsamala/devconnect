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

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/join", joinRoutes);

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

  socket.on("registerUser", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

app.set("io", io);
app.set("users", users);
const ratingRoutes = require("./routes/ratings");
app.use("/api/ratings", ratingRoutes);
const githubRoutes = require("./routes/github");
app.use("/api/github", githubRoutes);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
