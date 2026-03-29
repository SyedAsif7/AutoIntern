import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  mode: {
    type: String,
    enum: ['remote', 'hybrid', 'onsite'],
    required: true,
  },
  domain: { type: String, required: true },
  skills: [{ type: String }],
  duration: { type: Number, required: true }, // weeks
  stipend: { type: String },
  description: { type: String, required: true },
  applyLink: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Internship', internshipSchema);
