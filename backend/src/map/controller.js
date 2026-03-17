// src/map/controller.js

const {
  getAllMarkers,
  getPropertyLocationById
} = require("./services");


//get all markers for map - combine regular houses and housing schemes
function getMarkers(req, res) {

  try {

    const markers = getAllMarkers();
    res.json(markers);

  } catch (error) {

    console.error("Map markers error:", error);

    res.status(500).json({
      error: "Failed to load markers"
    });
  }
}


//get location details for single property by ID
function getPropertyLocation(req, res) {

  try {

    const { id } = req.params;

    const location = getPropertyLocationById(id);

    if (!location) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    res.json(location);

  } catch (error) {

    console.error("Map location error:", error);

    res.status(500).json({
      error: "Failed to load location"
    });
  }
}


module.exports = {
  getMarkers,
  getPropertyLocation
};