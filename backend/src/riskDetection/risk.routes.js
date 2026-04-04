const express = require("express");
const router = express.Router();
const { analyzeRisk } = require("./risk.controller");

router.post("/analyze-risk", analyzeRisk);

module.exports = router;