import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  profile: {
    branch: { type: String },
    year: { type: String },
    college: { type: String },
    city: { type: String },
    skills: [{ type: String }],
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    bio: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
