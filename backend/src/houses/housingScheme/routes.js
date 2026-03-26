//src/houses/housingScheme/routes.js
const express = require("express");
const router = express.Router();
const { getEligibleSchemes } = require("./services");

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

module.exports = router;