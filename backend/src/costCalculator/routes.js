const express = require("express");
const router = express.Router();

// Import from your controller file
const { calculateTrueCost } = require("./controller");

// The final URL will be http://localhost:5000/api/calculate-true-cost
router.post("/calculate-true-cost", calculateTrueCost);

module.exports = router;