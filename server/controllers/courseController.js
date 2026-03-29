import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import DailyLog from '../models/DailyLog.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  const { uid, courseId } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const existingEnrollment = await Enrollment.findOne({ studentId: user._id, courseId });
    if (existingEnrollment) return res.status(400).json({ error: 'Already enrolled' });

    const enrollment = new Enrollment({
      studentId: user._id,
      courseId,
      status: 'active',
      currentWeek: 1,
      overallProgress: 0,
      weeklyProgress: [{ week: 1, lessonsCompleted: 0, quizScore: 0, assignmentSubmitted: false, timeSpentMinutes: 0 }]
    });

    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProgress = async (req, res) => {
  const { enrollmentId, week, lessonIndex, timeSpent } = req.body;
  try {
    const enrollment = await Enrollment.findById(enrollmentId).populate('courseId');
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });

    let weekProgress = enrollment.weeklyProgress.find(w => w.week === week);
    if (!weekProgress) {
      weekProgress = { week, lessonsCompleted: 0, quizScore: 0, assignmentSubmitted: false, timeSpentMinutes: 0 };
      enrollment.weeklyProgress.push(weekProgress);
    }

    weekProgress.lessonsCompleted += 1;
    weekProgress.timeSpentMinutes += timeSpent || 0;

    // Calculate overall progress
    const totalLessons = enrollment.courseId.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = enrollment.weeklyProgress.reduce((sum, w) => sum + w.lessonsCompleted, 0);
    enrollment.overallProgress = Math.min(Math.round((completedLessons / totalLessons) * 100), 100);

    await enrollment.save();

    // Log daily activity
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let log = await DailyLog.findOne({ studentId: enrollment.studentId, date: today });
    if (log) {
      log.lessonsWatched += 1;
      log.minutesSpent += timeSpent || 0;
    } else {
      log = new DailyLog({
        studentId: enrollment.studentId,
        enrollmentId,
        date: today,
        lessonsWatched: 1,
        minutesSpent: timeSpent || 0
      });
    }
    await log.save();

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitQuiz = async (req, res) => {
  const { enrollmentId, week, score } = req.body;
  try {
    const enrollment = await Enrollment.findById(enrollmentId);
    let weekProgress = enrollment.weeklyProgress.find(w => w.week === week);
    if (weekProgress) {
      weekProgress.quizScore = score;
    }
    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
