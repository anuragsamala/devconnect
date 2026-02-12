const express = require("express");
const router = express.Router();
const pool = require("../db");

// ADD TASK
router.post("/add", async (req, res) => {
  try {
    const { project_id, title } = req.body;

    await pool.query(
      "INSERT INTO tasks (project_id, title) VALUES ($1,$2)",
      [project_id, title]
    );

    res.json({ message: "Task added" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// GET TASKS FOR A PROJECT
router.get("/:project_id", async (req, res) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE project_id=$1 ORDER BY id DESC",
      [req.params.project_id]
    );

    res.json(tasks.rows);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// UPDATE TASK STATUS
router.post("/update", async (req, res) => {
  try {
    const { task_id, status } = req.body;

    await pool.query(
      "UPDATE tasks SET status=$1 WHERE id=$2",
      [status, task_id]
    );

    res.json({ message: "Task status updated" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
