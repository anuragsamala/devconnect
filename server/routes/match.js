const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get recommended projects based on user skills
router.get("/:user_id", async (req, res) => {
  try {
    // Get user skills
    const user = await pool.query(
      "SELECT skills FROM users WHERE id=$1",
      [req.params.user_id]
    );

    const userSkills = user.rows[0].skills
      ?.toLowerCase()
      .split(",");

    // Get all projects
    const projects = await pool.query(
      "SELECT * FROM projects"
    );

    // Match projects
    const matched = projects.rows.filter(p => {
      const reqSkills = p.required_skills
        ?.toLowerCase()
        .split(",");

      return reqSkills?.some(skill =>
        userSkills?.includes(skill.trim())
      );
    });

    res.json(matched);

  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
