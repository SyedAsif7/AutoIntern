import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  status: {
    type: String,
    enum: ['saved', 'applied', 'shortlisted', 'interview', 'offered', 'rejected'],
    default: 'saved',
  },
  appliedAt: { type: Date, default: Date.now },
  notes: { type: String },
  nextStep: { type: String },
  boostedWithReport: { type: Boolean, default: false },
});

export default mongoose.model('Application', applicationSchema);
