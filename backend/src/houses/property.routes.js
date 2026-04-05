const express = require("express");
const router = express.Router();

const { getPropertyById } = require("./property.service");

router.get("/:id", (req, res) => {
  const property = getPropertyById(req.params.id);

  if (!property) {
    return res.status(404).json({
      message: "Property not found",
    });
  }

  res.json(property);
});

module.exports = router;