// src/map/routes.js

const express = require("express");
const router = express.Router();

const {
  getMarkers,
  getPropertyLocation
} = require("./controller");


//Get all markers for map - ni for search page
router.get("/markers", getMarkers);


//For single property location details, ni utk map marker click, dia akan fetch details utk display kat popup
router.get("/property/:id", getPropertyLocation);


module.exports = router;