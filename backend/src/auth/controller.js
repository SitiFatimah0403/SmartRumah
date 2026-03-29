const { saveUserProfile } = require("../user/profileService");

const { auth } = require("./firebase");   //ni dah betul, pasni check from here

const registerUser = async (req, res) => {
  try {

    console.log("AUTH:", auth);
    console.log("REGISTER CONTROLLER RUNNING");

    const { email, password, fullName } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email & password required",
      });
    }

    //create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName || "",
    });

    //generate custom token
    const token = await auth.createCustomToken(userRecord.uid);

    res.status(201).json({
      message: "User registered successfully",
      uid: userRecord.uid,
      token: token,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { registerUser };