import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrollmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
  date: { type: Date, required: true }, // Store as Date with no time
  lessonsWatched: { type: Number, default: 0 },
  minutesSpent: { type: Number, default: 0 },
  quizAttempted: { type: Boolean, default: false },
  quizScore: { type: Number, default: 0 },
  assignmentSubmitted: { type: Boolean, default: false },
  notes: { type: String },
  mood: {
    type: String,
    enum: ['great', 'good', 'okay', 'struggling'],
  },
});

export default mongoose.model('DailyLog', dailyLogSchema);
