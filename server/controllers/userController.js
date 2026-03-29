import User from "../models/User.js";

export async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.userId).lean();
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({
      user: {
        id: user._id.toString(),
        uid: user.uid,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        onboardingComplete: user.onboardingComplete,
        profile: user.profile,
        createdAt: user.createdAt,
        lastActive: user.lastActive,
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function putProfile(req, res, next) {
  try {
    const {
      name,
      phone,
      profile,
      onboardingComplete,
    } = req.body || {};

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "Not found" });

    if (typeof name === "string") user.name = name;
    if (typeof phone === "string") user.phone = phone;
    if (profile && typeof profile === "object") {
      const base = user.profile?.toObject?.() || user.profile || {};
      user.profile = { ...base, ...profile };
      user.markModified("profile");
    }
    if (typeof onboardingComplete === "boolean") {
      user.onboardingComplete = onboardingComplete;
    }
    user.lastActive = new Date();
    await user.save();

    res.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        phone: user.phone,
        onboardingComplete: user.onboardingComplete,
        profile: user.profile,
      },
    });
  } catch (e) {
    next(e);
  }
}
