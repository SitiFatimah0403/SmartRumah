const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

function getServiceAccount() {
 
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
  }

  // ⚠️ fallback (LOCAL only)
  const fallbackPath = path.join(__dirname, "firebaseKey.json");

  if (!fs.existsSync(fallbackPath)) {
    throw new Error("Firebase key not found");
  }

  return JSON.parse(fs.readFileSync(fallbackPath, "utf8"));
}

const serviceAccount = getServiceAccount();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { admin, db, auth };