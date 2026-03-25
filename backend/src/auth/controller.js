import { saveUserProfile } from "../user/profileService.js";

export const registerUser = async (req, res) => {
  try {
    const formData = req.body;

    //User ID from the authenticated token
    const userId = req.user.uid

    await saveUserProfile(userId, formData);

    res.status(200).json({
      message: "User profile saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to save user profile",
    });
  }
};