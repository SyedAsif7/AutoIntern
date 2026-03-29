import express from 'express';
import multer from 'multer';
import { getRoadmap, getInterviewQuestions, getInterviewFeedback, analyseResume, chatWithMentor } from '../controllers/aiController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/roadmap', getRoadmap);
router.post('/interview-questions', getInterviewQuestions);
router.post('/interview-feedback', getInterviewFeedback);
router.post('/resume-analyse', upload.single('resume'), analyseResume);
router.post('/mentor-chat', chatWithMentor);

export default router;
