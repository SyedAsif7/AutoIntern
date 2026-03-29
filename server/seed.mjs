import "dotenv/config";
import mongoose from "mongoose";
import Internship from "./models/Internship.js";

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

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("Set MONGODB_URI");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);
  await Internship.deleteMany({ company: { $in: samples.map((s) => s.company) } });
  await Internship.insertMany(samples);
  console.log("Seeded", samples.length, "internships");
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
