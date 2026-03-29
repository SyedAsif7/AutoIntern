import { generateAIResponse } from '../utils/aiHelper.js';
import User from '../models/User.js';
import MockSession from '../models/MockSession.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

export const getRoadmap = async (req, res) => {
  const { uid, role, domain } = req.body;
  try {
    const user = await User.findOne({ uid });
    const skills = user?.profile?.skills?.join(', ') || 'basic engineering skills';
    const branch = user?.profile?.branch || 'engineering';

    const prompt = `You are a career coach for Indian engineering students. Generate a detailed 2-week internship preparation roadmap for a ${branch} student applying for a ${role} internship at a ${domain} company. The student already knows: ${skills}. Format the response as JSON with this structure: { "week1": { "title": "...", "days": [{ "day": 1, "tasks": [{ "time": "...", "task": "...", "resource": "..." }] }] }, "week2": { "title": "...", "days": [...] }, "tips": [] }`;

    const roadmap = await generateAIResponse(prompt);
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInterviewQuestions = async (req, res) => {
  const { role, domain } = req.body;
  try {
    const prompt = `Generate 10 technical and HR interview questions for a ${role} internship in ${domain} for an Indian engineering student. For each question, provide: the question, difficulty (easy/medium/hard), what skill it tests, and a model answer. Return as JSON array of objects with structure: { "question": "...", "difficulty": "...", "skill": "...", "modelAnswer": "..." }`;

    const questions = await generateAIResponse(prompt);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInterviewFeedback = async (req, res) => {
  const { question, studentAnswer, modelAnswer } = req.body;
  try {
    const prompt = `Question: ${question}\nModel Answer: ${modelAnswer}\nStudent Answer: ${studentAnswer}\nCompare this student answer to the model answer and give: score out of 10, 3 strengths, 3 improvements, overall feedback. Be encouraging but honest. Return as JSON with structure: { "score": 8, "strengths": ["...", "...", "..."], "improvements": ["...", "...", "..."], "summary": "..." }`;

    const feedback = await generateAIResponse(prompt);
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const analyseResume = async (req, res) => {
  const { role, skillsRequired } = req.body;
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    const prompt = `Analyse this student resume for a ${role} internship requiring skills: ${skillsRequired.join(', ')}. Resume Content: ${resumeText}. Return JSON with: { "overallScore": number, "missingSkills": [], "presentSkills": [], "suggestions": [{ "section": "...", "issue": "...", "fix": "..." }], "summary": "string" }`;

    const analysis = await generateAIResponse(prompt);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const chatWithMentor = async (req, res) => {
  const { message, history } = req.body;
  try {
    const prompt = `You are "AutoIntern Mentor", a helpful and encouraging career guide for Indian engineering students. 
    Previous Context: ${JSON.stringify(history)}
    Student says: ${message}
    Respond in a friendly, professional way. Keep it concise. Focus on internships, skills, and career growth.`;

    const response = await generateAIResponse(prompt, true);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
