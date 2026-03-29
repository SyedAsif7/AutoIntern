import mongoose from 'mongoose';

const mockSessionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  domain: { type: String, required: true },
  questions: [
    {
      question: { type: String },
      difficulty: { type: String },
      skill: { type: String },
      modelAnswer: { type: String },
      studentAnswer: { type: String },
      feedback: {
        score: { type: Number },
        strengths: [{ type: String }],
        improvements: [{ type: String }],
        summary: { type: String },
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('MockSession', mockSessionSchema);
