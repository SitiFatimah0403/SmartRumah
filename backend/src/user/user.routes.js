const express = require("express");
const router = express.Router();

const { updateUserProfile } = require("./user.controller");

router.post("/update-profile", updateUserProfile);

module.exports = router;