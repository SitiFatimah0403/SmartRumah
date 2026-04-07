const fs = require("fs")
const path = require("path")
const admin = require("firebase-admin")

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    } catch (error) {
      throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON. Ensure it is valid JSON.")
    }
  }

  const configuredPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  const fallbackPath = path.join(__dirname, "firebaseKey.json")
  const keyPath = configuredPath
    ? path.isAbsolute(configuredPath)
      ? configuredPath
      : path.join(process.cwd(), configuredPath)
    : fallbackPath

  if (!fs.existsSync(keyPath)) {
    throw new Error(
      "Firebase service account key not found. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH."
    )
  }

  const fileContent = fs.readFileSync(keyPath, "utf8")
  return JSON.parse(fileContent)
}

const serviceAccount = getServiceAccount()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const auth = admin.auth();
const db = admin.firestore()

module.exports = { admin, db, auth }