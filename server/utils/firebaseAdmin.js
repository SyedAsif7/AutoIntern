import admin from "firebase-admin";

let initialized = false;

export function initFirebaseAdmin() {
  if (initialized) return;
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json) {
    console.warn(
      "FIREBASE_SERVICE_ACCOUNT_JSON not set — Firebase ID token verification disabled (dev only)."
    );
    return;
  }
  try {
    const cred = JSON.parse(json);
    admin.initializeApp({ credential: admin.credential.cert(cred) });
    initialized = true;
    console.log("Firebase Admin initialized");
  } catch (e) {
    console.error("Firebase Admin init failed:", e.message);
  }
}

export async function verifyFirebaseIdToken(idToken) {
  if (!initialized) {
    throw new Error("Firebase Admin not configured");
  }
  return admin.auth().verifyIdToken(idToken);
}

export function isFirebaseAdminReady() {
  return initialized;
}
