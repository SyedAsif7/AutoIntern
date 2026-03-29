import express from 'express';
import { getAllCourses, getCourseBySlug, enrollInCourse, updateProgress, submitQuiz } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:slug', getCourseBySlug);
router.post('/enroll', enrollInCourse);
router.post('/progress', updateProgress);
router.post('/quiz', submitQuiz);

export default router;
