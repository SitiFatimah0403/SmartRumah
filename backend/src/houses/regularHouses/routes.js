// src/houses/regularHouses/routes.js

const express = require("express");
const router = express.Router();

const {
  getAllRegularHouses,
  getRegularHouseById,
  getRegularHouseLocations
} = require("./services");

//Get all regular houses (full data for listing)
router.get("/", (req, res) => {
  res.json(getAllRegularHouses());
});

//ni for map markers utk map, kita return minimal info je, takyah price ke apa, just ID, name, lat lng
router.get("/map/locations", (req, res) => {
  res.json(getRegularHouseLocations());
});

//Get single house details by ID, utk details page
router.get("/:id", (req, res) => {

  const house = getRegularHouseById(req.params.id);

  if (!house) {
    return res.status(404).json({
      message: "House not found"
    });
  }

  res.json(house);
});

module.exports = router;