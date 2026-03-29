import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const m = header.match(/^Bearer\s+(.+)$/i);
    if (!m) {
      return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }
    const decoded = verifyToken(m[1]);
    const userId = decoded.sub || decoded.userId;
    if (!userId) {
      return res.status(401).json({ error: "Invalid token payload" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    req.userId = user._id;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized", details: e.message });
  }
}
