const express = require("express");
const router = express.Router();
const pool = require("../db");

// ADD RATING
router.post("/add", async (req, res) => {
  try {
    const { project_id, reviewer_id, reviewed_user_id, rating, feedback } = req.body;

    await pool.query(
      `INSERT INTO ratings 
       (project_id, reviewer_id, reviewed_user_id, rating, feedback)
       VALUES ($1,$2,$3,$4,$5)`,
      [project_id, reviewer_id, reviewed_user_id, rating, feedback]
    );

    res.json({ message: "Rating submitted" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// GET RATINGS FOR A USER
router.get("/:user_id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ratings WHERE reviewed_user_id=$1",
      [req.params.user_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
