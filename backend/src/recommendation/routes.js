const express = require("express");
const router = express.Router();

const { getRecommendations } = require("./services");

router.post("/", (req, res) => {
  try {
    const user = req.body;

    const result = getRecommendations(user);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

module.exports = router;