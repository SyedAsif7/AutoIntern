import "dotenv/config";
import mongoose from "mongoose";
import Internship from "./models/Internship.js";
import Course from "./models/Course.js";

const samples = [
  {
    title: "Frontend Intern — React",
    company: "TechNova India",
    location: "Bengaluru",
    mode: "hybrid",
    domain: "Web Dev",
    skills: ["React", "JavaScript", "Git"],
    duration: 8,
    stipend: "₹25k/month",
    description: "Build UI components for a B2B dashboard.",
    applyLink: "#",
    isActive: true,
    
  },
  {
    title: "ML Engineering Intern",
    company: "DataGrid Labs",
    location: "Remote",
    mode: "remote",
    domain: "Python & ML",
    skills: ["Python", "Machine Learning", "SQL"],
    duration: 6,
    stipend: "₹30k/month",
    description: "Assist with model evaluation and data pipelines.",
    applyLink: "#",
    isActive: true,
  },
  {
    title: "Security Analyst Intern",
    company: "ShieldSec",
    location: "Pune",
    mode: "onsite",
    domain: "Cybersecurity",
    skills: ["Networking", "Linux"],
    duration: 8,
    stipend: "₹20k/month",
    description: "SOC rotations and vulnerability triage.",
    applyLink: "#",
    isActive: true,
  },
];

const courseSamples = [
  {
    title: "Full Stack Web Development",
    slug: "full-stack-web-dev",
    description: "Learn to build modern web applications from scratch using MERN stack.",
    duration: 8,
    domain: "Web Dev",
    level: "Intermediate",
    isPublished: true,
    modules: [
      {
        weekNumber: 1,
        title: "Frontend Fundamentals",
        lessons: [
          { title: "HTML & CSS Best Practices", duration: "1h" },
          { title: "JavaScript ES6+", duration: "1.5h" }
        ],
        quiz: {
          questions: [
            { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" }
          ]
        }
      }
    ]
  },
  {
    title: "Python & Machine Learning",
    slug: "python-ml",
    description: "Master Python programming and build predictive models with real-world datasets.",
    duration: 6,
    domain: "Python & ML",
    level: "Beginner",
    isPublished: true,
    modules: [
      {
        weekNumber: 1,
        title: "Introduction to Python",
        lessons: [
          { title: "Data Types & Variables", duration: "45m" }
        ],
        quiz: {
          questions: [
            { q: "Which of these is a Python data type?", options: ["List", "Component"], answer: "List" }
          ]
        }
      }
    ]
  }
];

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("Set MONGODB_URI");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Seed Internships
  await Internship.deleteMany({ company: { $in: samples.map((s) => s.company) } });
  await Internship.insertMany(samples);
  console.log("Seeded", samples.length, "internships");

  // Seed Courses
  await Course.deleteMany({ slug: { $in: courseSamples.map(c => c.slug) } });
  await Course.insertMany(courseSamples);
  console.log("Seeded", courseSamples.length, "courses");

  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
