const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET REPO DETAILS
router.post("/repo", async (req, res) => {
  try {
    const { repo_url } = req.body;

    // Example:
    // https://github.com/user/repo
    const parts = repo_url.split("/");
    const owner = parts[3];
    const repo = parts[4];

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    const data = {
      name: response.data.name,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      last_updated: response.data.updated_at
    };

    res.json(data);
  } catch (err) {
    res.json({ error: "Invalid GitHub repo link" });
  }
});

module.exports = router;
