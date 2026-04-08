const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth/middleware");
const { calculateSuitability } = require("./suitability.controller");

router.post("/calculate-suitability", authMiddleware, calculateSuitability);

module.exports = router;
