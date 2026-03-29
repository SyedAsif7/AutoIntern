import Notification from '../models/Notification.js';
import User from '../models/User.js';

export const getNotifications = async (req, res) => {
  const { uid } = req.query;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const notifications = await Notification.find({ studentId: user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    await Notification.updateMany({ studentId: user._id, isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNotification = async (studentId, type, title, message, link) => {
  try {
    const notification = new Notification({ studentId, type, title, message, link });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
