const express = require("express");
const router = express.Router();
const pool = require("../db");

// SEND JOIN REQUEST
router.post("/send", async (req, res) => {
  try {
    const { project_id, user_id } = req.body;

    // Prevent duplicate requests
    const check = await pool.query(
      "SELECT * FROM join_requests WHERE project_id=$1 AND user_id=$2",
      [project_id, user_id]
    );

    if (check.rows.length > 0) {
      return res.json({ message: "Already requested" });
    }

    await pool.query(
      "INSERT INTO join_requests (project_id, user_id) VALUES ($1,$2)",
      [project_id, user_id]
    );

    res.json({ message: "Join request sent" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// VIEW REQUESTS FOR A PROJECT (Owner view)
router.get("/:project_id", async (req, res) => {
  try {
    const requests = await pool.query(
      "SELECT * FROM join_requests WHERE project_id=$1",
      [req.params.project_id]
    );

    res.json(requests.rows);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// ACCEPT REQUEST + REAL-TIME NOTIFICATION
router.post("/accept", async (req, res) => {
  try {
    const { request_id, role } = req.body;

    const request = await pool.query(
      "SELECT * FROM join_requests WHERE id=$1",
      [request_id]
    );

    if (request.rows.length === 0) {
      return res.json({ message: "Request not found" });
    }

    const project_id = request.rows[0].project_id;
    const user_id = request.rows[0].user_id;

    // Add to team_members
    await pool.query(
      "INSERT INTO team_members (project_id, user_id, role) VALUES ($1,$2,$3)",
      [project_id, user_id, role]
    );

    // Update request status
    await pool.query(
      "UPDATE join_requests SET status='ACCEPTED' WHERE id=$1",
      [request_id]
    );

    // 🔔 SOCKET.IO NOTIFICATION
    const io = req.app.get("io");
    const users = req.app.get("users");

    const socketId = users[user_id];

    if (socketId) {
      io.to(socketId).emit("notification", {
        message: "Your join request was accepted 🎉",
      });
    }

    res.json({ message: "Request accepted" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// REJECT REQUEST
router.post("/reject", async (req, res) => {
  try {
    const { request_id } = req.body;

    await pool.query(
      "UPDATE join_requests SET status='REJECTED' WHERE id=$1",
      [request_id]
    );

    res.json({ message: "Request rejected" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
