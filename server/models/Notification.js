import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['course_match', 'quiz_result', 'week_unlock', 'completion', 'certificate_ready', 'reminder'],
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Notification', notificationSchema);
