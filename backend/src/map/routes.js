const express = require("express");
const router = express.Router();
const { getMarkers, getPropertyLocation } = require("./controller");

// Static route for all markers on map
router.get("/markers", getMarkers);

// Dynamic route for single property location details by ID
router.get("/property/:id", getPropertyLocation);

module.exports = router;