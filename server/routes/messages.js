const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all messages for a project
router.get("/:project_id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages WHERE project_id=$1 ORDER BY created_at ASC",
      [req.params.project_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
