import express from 'express';
import { saveApplication, getMyApplications, updateApplicationStatus } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', saveApplication);
router.get('/mine', getMyApplications);
router.patch('/:id', updateApplicationStatus);

export default router;
