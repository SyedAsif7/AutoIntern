import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrolledAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped'],
    default: 'active',
  },
  currentWeek: { type: Number, default: 1 },
  overallProgress: { type: Number, default: 0 }, // 0–100
  weeklyProgress: [
    {
      week: { type: Number, required: true },
      lessonsCompleted: { type: Number, default: 0 },
      quizScore: { type: Number, default: 0 },
      assignmentSubmitted: { type: Boolean, default: false },
      timeSpentMinutes: { type: Number, default: 0 },
    },
  ],
});

export default mongoose.model('Enrollment', enrollmentSchema);
