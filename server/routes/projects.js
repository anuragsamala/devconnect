const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE PROJECT
router.post("/create", async (req, res) => {
  try {
    const { title, description, owner_id, team_size, required_skills } = req.body;

    await pool.query(
      "INSERT INTO projects (title, description, owner_id, team_size, required_skills) VALUES ($1,$2,$3,$4,$5)",
      [title, description, owner_id, team_size, required_skills]
    );

    res.json({ message: "Project created successfully" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM projects ORDER BY id DESC");
    res.json(projects.rows);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// GET SINGLE PROJECT
router.get("/:id", async (req, res) => {
  try {
    const project = await pool.query(
      "SELECT * FROM projects WHERE id=$1",
      [req.params.id]
    );

    res.json(project.rows[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
