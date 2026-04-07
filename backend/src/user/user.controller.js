const { db } = require("../auth/firebase")

const updateUserProfile = async (req, res) => {
  try {
    const { uid, ...data } = req.body
    const tokenUid = req.user?.uid
    const finalUid = tokenUid || uid

    if (!finalUid) {
      return res.status(400).json({ error: "UID is required" })
    }

    await db.collection("users").doc(finalUid).set(data, { merge: true })

    res.status(200).json({
      message: "User profile updated",
      data,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getMyProfile = async (req, res) => {
  try {
    const uid = req.user?.uid

    if (!uid) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const doc = await db.collection("users").doc(uid).get()

    if (!doc.exists) {
      return res.status(404).json({ message: "Profile not found", profile: null })
    }

    res.status(200).json({
      uid,
      profile: doc.data(),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { updateUserProfile, getMyProfile }