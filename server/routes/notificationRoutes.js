import express from 'express';
import { getNotifications, markAllAsRead, markAsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getNotifications);
router.post('/read', markAllAsRead);
router.post('/read/:id', markAsRead);

export default router;
