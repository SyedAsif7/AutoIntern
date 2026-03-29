import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { verifyFirebaseIdToken, isFirebaseAdminReady } from "../utils/firebaseAdmin.js";

/**
 * Exchange Firebase ID token for API JWT + ensure MongoDB user exists.
 */
export async function postFirebaseSession(req, res, next) {
  try {
    const { idToken, email: bodyEmail, name: bodyName } = req.body || {};
    let uid;
    let email = bodyEmail;
    let name = bodyName || "";

    const devBypass =
      process.env.DEV_BYPASS_AUTH === "true" && process.env.NODE_ENV !== "production";

    if (devBypass) {
      uid = req.body?.devUid || "dev-user-uid";
      email = email || "dev@autointern.local";
      name = name || "Dev User";
    } else if (idToken && isFirebaseAdminReady()) {
      const decoded = await verifyFirebaseIdToken(idToken);
      uid = decoded.uid;
      email = decoded.email || email;
      name = decoded.name || name;
    } else if (idToken && !isFirebaseAdminReady()) {
      return res.status(503).json({
        error:
          "Firebase Admin not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON or use DEV_BYPASS_AUTH=true for local dev.",
      });
    } else {
      return res.status(400).json({ error: "idToken required" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({
        uid,
        email,
        name: name || email.split("@")[0],
        lastActive: new Date(),
      });
    } else {
      user.email = email;
      if (name) user.name = name;
      user.lastActive = new Date();
      await user.save();
    }

    const token = signToken({ sub: user._id.toString(), uid: user.uid, role: user.role });

    res.json({
      token,
      user: {
        id: user._id.toString(),
        uid: user.uid,
        email: user.email,
        name: user.name,
        onboardingComplete: user.onboardingComplete,
        profile: user.profile,
      },
    });
  } catch (e) {
    next(e);
  }
}
