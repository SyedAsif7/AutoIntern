import cron from 'node-cron';
import User from '../models/User.js';
import DailyLog from '../models/DailyLog.js';
import Enrollment from '../models/Enrollment.js';
import { sendEmail, getDailyReminderTemplate } from './emailHelper.js';
import { createNotification } from '../controllers/notificationController.js';

export const startDailyReminders = () => {
  // Run at 8 PM daily (IST - Indian Standard Time)
  // Assuming the server time is in UTC, we need to adjust accordingly (IST = UTC + 5:30)
  // 8:00 PM IST is 2:30 PM UTC
  cron.schedule('30 14 * * *', async () => {
    console.log('Running daily reminder cron job...');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      // Find all students with active enrollments
      const activeEnrollments = await Enrollment.find({ status: 'active' }).populate('studentId');
      
      for (const enrollment of activeEnrollments) {
        const student = enrollment.studentId;
        
        // Check if student has a daily log for today
        const log = await DailyLog.findOne({ studentId: student._id, date: today });
        
        if (!log) {
          // Send reminder email
          const streak = 5; // Replace with actual streak calculation
          await sendEmail(
            student.email,
            `Don't break your streak, ${student.name}! 🔥`,
            getDailyReminderTemplate(student.name, streak)
          );
          
          // Create in-app notification
          await createNotification(
            student._id,
            'reminder',
            'Daily Learning Reminder',
            "Don't forget to log your learning today! Keep your streak alive.",
            '/dashboard'
          );
        }
      }
    } catch (error) {
      console.error('Error in daily reminder cron job:', error);
    }
  });
};
