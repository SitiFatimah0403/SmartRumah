const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth/middleware");
const { updateUserProfile, getMyProfile } = require("./user.controller");

router.get("/me", authMiddleware, getMyProfile);
router.post("/update-profile", authMiddleware, updateUserProfile);

module.exports = router;