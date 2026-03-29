import Enrollment from "../models/Enrollment.js";
import DailyLog from "../models/DailyLog.js";
import Internship from "../models/Internship.js";
import Application from "../models/Application.js";

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function computeStreak(userId) {
  return DailyLog.find({ studentId: userId })
    .sort({ date: -1 })
    .lean()
    .then((logs) => {
      if (!logs.length) return 0;
      const days = new Set(
        logs.map((l) => startOfDay(l.date).getTime())
      );
      let streak = 0;
      let cursor = startOfDay(new Date());
      while (days.has(cursor.getTime())) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
      return streak;
    });
}

function profileCompletion(user) {
  const p = user.profile || {};
  const fields = [
    p.branch,
    p.year,
    p.college,
    p.city,
    (p.skills && p.skills.length) || 0,
    p.linkedinUrl,
    p.githubUrl,
    p.bio,
    (p.interestedDomains && p.interestedDomains.length) || 0,
    p.careerGoal,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

function matchScore(internship, user) {
  const skills = (user.profile?.skills || []).map((s) => s.toLowerCase());
  const dom = (user.profile?.interestedDomains || []).map((s) => s.toLowerCase());
  let score = 40;
  (internship.skills || []).forEach((s) => {
    if (skills.some((k) => s.toLowerCase().includes(k) || k.includes(s.toLowerCase())))
      score += 15;
  });
  if (dom.length && internship.domain && dom.some((d) => internship.domain.toLowerCase().includes(d)))
    score += 20;
  score += Math.min(25, (internship.skills || []).length * 3);
  return Math.min(99, Math.round(score));
}

export async function getDashboardSummary(req, res, next) {
  try {
    const user = req.user;
    const userId = user._id;

    const [enrollments, streak, apps, internships] = await Promise.all([
      Enrollment.find({ studentId: userId, status: "active" })
        .populate("courseId")
        .lean(),
      computeStreak(userId),
      Application.find({ studentId: userId }).lean(),
      Internship.find({ isActive: true }).limit(20).lean(),
    ]);

    const coursesEnrolled = await Enrollment.countDocuments({ studentId: userId });
    const savedCount = await Application.countDocuments({
      studentId: userId,
      status: "saved",
    });

    const active = enrollments[0];
    let continueLearning = null;
    let todayTask = null;

    if (active && active.courseId) {
      const course = active.courseId;
      const week = active.currentWeek || 1;
      const mod = (course.modules || []).find((m) => m.weekNumber === week) || course.modules?.[0];
      const lesson = mod?.lessons?.[0];
      continueLearning = {
        courseId: course._id,
        title: course.title,
        slug: course.slug,
        thumbnail: course.thumbnail,
        progress: active.overallProgress || 0,
        currentWeek: week,
      };
      todayTask = lesson
        ? {
            title: lesson.title,
            duration: lesson.duration,
            weekLabel: `Week ${week}`,
            enrollmentId: active._id,
          }
        : { title: "Continue your course", weekLabel: `Week ${week}`, enrollmentId: active._id };
    }

    const matched = internships
      .map((i) => ({
        ...i,
        matchPercent: matchScore(i, user),
      }))
      .sort((a, b) => b.matchPercent - a.matchPercent)
      .slice(0, 3);

    res.json({
      greetingName: user.name || "Student",
      streak,
      metrics: {
        coursesEnrolled,
        currentStreak: streak,
        internshipsSaved: savedCount,
        profileCompletion: profileCompletion(user),
      },
      continueLearning,
      matchedInternships: matched,
      todayTask,
    });
  } catch (e) {
    next(e);
  }
}

export async function postTodayComplete(req, res, next) {
  try {
    const { enrollmentId } = req.body || {};
    if (!enrollmentId) return res.status(400).json({ error: "enrollmentId required" });

    const en = await Enrollment.findOne({
      _id: enrollmentId,
      studentId: req.userId,
    });
    if (!en) return res.status(404).json({ error: "Enrollment not found" });

    const today = startOfDay(new Date());
    await DailyLog.findOneAndUpdate(
      { studentId: req.userId, enrollmentId: en._id, date: today },
      {
        $set: {
          lessonsWatched: 1,
          minutesSpent: 30,
          mood: "good",
        },
      },
      { upsert: true, new: true }
    );

    en.overallProgress = Math.min(100, (en.overallProgress || 0) + 2);
    await en.save();

    res.json({ ok: true, overallProgress: en.overallProgress });
  } catch (e) {
    next(e);
  }
}
