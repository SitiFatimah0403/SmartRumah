const { db } = require("../auth/firebase")

const updateUserProfile = async (req, res) => {
  try {
    const { uid, ...data } = req.body

    if (!uid) {
      return res.status(400).json({ error: "UID is required" })
    }

    await db.collection("users").doc(uid).set(data, { merge: true })

    res.status(200).json({
      message: "User profile updated",
      data,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { updateUserProfile }