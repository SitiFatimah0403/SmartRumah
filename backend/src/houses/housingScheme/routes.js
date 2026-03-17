// src/houses/housingScheme/routes.js

const express = require("express");
const router = express.Router();

const {
  getEligibleSchemes,
  getAllHousingProjects,
  getHousingProjectById,
  getHousingProjectLocations
} = require("./services");


//DSS policy matching for user input criteria
router.post("/eligible", (req, res) => {

  try {

    const user = req.body;
    const result = getEligibleSchemes(user);

    res.json(result);

  } catch (error) {

    console.error("Error calculating eligible schemes:", error);

    res.status(500).json({
      error: "Failed to calculate eligible schemes"
    });
  }

});


//Get all housing list
router.get("/", (req, res) => {
  res.json(getAllHousingProjects());
});


//Get map locations for all housing projects
router.get("/map/locations", (req, res) => {
  res.json(getHousingProjectLocations());
});


//Get single housing project details by ID
router.get("/:id", (req, res) => {

  const project = getHousingProjectById(req.params.id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  res.json(project);

});


module.exports = router;