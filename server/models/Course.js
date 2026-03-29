import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  duration: { type: Number, required: true }, // weeks, 4–8
  domain: {
    type: String,
    enum: [
      'Web Dev',
      'Python & ML',
      'Data Analytics',
      'UI/UX Design',
      'Cybersecurity',
      'Cloud Computing',
      'Digital Marketing',
      'Business Analytics',
    ],
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  modules: [
    {
      weekNumber: { type: Number, required: true },
      title: { type: String, required: true },
      lessons: [
        {
          title: { type: String, required: true },
          videoUrl: { type: String },
          duration: { type: String },
          notes: { type: String },
        },
      ],
      quiz: {
        questions: [
          {
            q: { type: String, required: true },
            options: [{ type: String, required: true }],
            answer: { type: String, required: true },
          },
        ],
      },
      assignment: {
        title: { type: String },
        description: { type: String },
        submissionType: { type: String, enum: ['link', 'file'] },
      },
    },
  ],
  certificateTemplate: { type: String },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Course', courseSchema);
