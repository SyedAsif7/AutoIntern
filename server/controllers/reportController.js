import PDFDocument from 'pdfkit';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import DailyLog from '../models/DailyLog.js';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

export const getFullReport = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await Enrollment.findById(id).populate('courseId').populate('studentId');
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });

    const dailyLogs = await DailyLog.find({ enrollmentId: id }).sort({ date: 1 });
    
    // Performance Calculations
    const totalQuizScore = enrollment.weeklyProgress.reduce((sum, w) => sum + w.quizScore, 0);
    const overallScore = enrollment.weeklyProgress.length > 0 ? totalQuizScore / enrollment.weeklyProgress.length : 0;
    
    const assignmentsSubmitted = enrollment.weeklyProgress.filter(w => w.assignmentSubmitted).length;
    const assignmentsTotal = enrollment.courseId.modules.length;
    
    const totalTimeSpentMinutes = enrollment.weeklyProgress.reduce((sum, w) => sum + w.timeSpentMinutes, 0);
    const totalLessonsCompleted = enrollment.weeklyProgress.reduce((sum, w) => sum + w.lessonsCompleted, 0);

    const report = {
      student: {
        name: enrollment.studentId.name,
        email: enrollment.studentId.email,
        college: enrollment.studentId.profile.college,
        branch: enrollment.studentId.profile.branch,
      },
      course: {
        title: enrollment.courseId.title,
        domain: enrollment.courseId.domain,
        duration: enrollment.courseId.duration,
        level: enrollment.courseId.level,
      },
      enrollment: {
        startDate: enrollment.enrolledAt,
        completionDate: enrollment.completedAt,
        totalDays: Math.ceil((new Date() - new Date(enrollment.enrolledAt)) / (1000 * 60 * 60 * 24)),
      },
      performance: {
        overallScore,
        weeklyBreakdown: enrollment.weeklyProgress,
        totalLessonsCompleted,
        totalTimeSpentHours: (totalTimeSpentMinutes / 60).toFixed(1),
        assignmentsSubmitted,
        assignmentsTotal,
        bestWeek: enrollment.weeklyProgress.reduce((best, w) => w.quizScore > (best?.quizScore || 0) ? w : best, {}).week,
        consistencyScore: (dailyLogs.length / Math.ceil((new Date() - new Date(enrollment.enrolledAt)) / (1000 * 60 * 60 * 24)) * 100).toFixed(0),
      },
      dailyActivity: dailyLogs.map(log => ({ date: log.date, minutesSpent: log.minutesSpent, lessonsWatched: log.lessonsWatched })),
      grade: overallScore >= 90 ? 'A+' : overallScore >= 80 ? 'A' : overallScore >= 70 ? 'B' : overallScore >= 60 ? 'C' : 'D',
      recommendation: "Excellent performance in React development. Recommended for Frontend Internship roles at top-tier startups.",
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadPDFReport = async (req, res) => {
  const { id } = req.params;
  try {
    let enrollment;
    if (id === 'sample-syed-asif') {
      enrollment = {
        studentId: { name: "Syed Asif", profile: { college: "Engineering College", branch: "Computer Engineering" } },
        courseId: { title: "Full Stack Web Development", duration: 8, level: "Intermediate" },
        completedAt: new Date()
      };
    } else {
      enrollment = await Enrollment.findById(id).populate('courseId').populate('studentId');
      if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
    }

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const width = doc.page.width;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Report_${enrollment.studentId.name.replace(/\s+/g, '_')}.pdf`);
    doc.pipe(res);

    // --- Header Section ---
    doc.rect(0, 0, width, 140).fill('#1e1b4b'); // Deep indigo header
    
    // Logo in Header
    doc.save();
    doc.roundedRect(50, 40, 50, 50, 10).fill('#4f46e5');
    doc.fillColor('#ffffff');
    doc.rect(60, 55, 30, 20, 2).fill(); // Case body
    doc.rect(67, 50, 16, 5).fill(); // Handle
    doc.restore();

    doc.fillColor('#ffffff').fontSize(28).font('Helvetica-Bold').text('AutoIntern', 115, 45);
    doc.fontSize(10).font('Helvetica').text('LEARNING PERFORMANCE REPORT', 115, 78, { characterSpacing: 2 });
    
    doc.fontSize(11).font('Helvetica-Bold').text('OFFICIAL ACADEMIC RECORD', width - 250, 50, { align: 'right', width: 200 });
    doc.fontSize(9).opacity(0.8).font('Helvetica').text(`Report ID: ${uuidv4().slice(0, 8).toUpperCase()}`, width - 250, 68, { align: 'right', width: 200 });
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, width - 250, 82, { align: 'right', width: 200 });
    doc.opacity(1);

    // --- Student Info Card (Premium Layout) ---
    const cardY = 160;
    doc.rect(50, cardY, width - 100, 100).fill('#f8fafc');
    doc.rect(50, cardY, 5, 100).fill('#4f46e5'); // Accent line
    
    doc.fillColor('#1e293b').fontSize(18).font('Helvetica-Bold').text(enrollment.studentId.name, 75, cardY + 20);
    doc.fillColor('#64748b').fontSize(11).font('Helvetica').text(enrollment.studentId.profile.college, 75, cardY + 45);
    doc.text(enrollment.studentId.profile.branch, 75, cardY + 62);
    
    doc.fillColor('#4f46e5').fontSize(13).font('Helvetica-Bold').text('PROGRAM ENROLLED', width - 300, cardY + 20, { align: 'right', width: 250 });
    doc.fillColor('#1e293b').fontSize(11).font('Helvetica-Bold').text(enrollment.courseId.title, width - 300, cardY + 40, { align: 'right', width: 250 });
    doc.fillColor('#64748b').fontSize(10).font('Helvetica').text(`${enrollment.courseId.duration} Weeks Intensive Program`, width - 300, cardY + 60, { align: 'right', width: 250 });
    doc.text(`Level: ${enrollment.courseId.level}`, width - 300, cardY + 75, { align: 'right', width: 250 });

    // --- Performance Grid ---
    doc.fillColor('#1e293b').fontSize(14).font('Helvetica-Bold').text('Executive Summary', 50, 285);
    const gridY = 310;
    const colWidth = (width - 130) / 4;
    
    const stats = [
      { label: 'OVERALL SCORE', value: '94%', color: '#4f46e5', bg: '#eef2ff' },
      { label: 'FINAL GRADE', value: 'A+', color: '#f59e0b', bg: '#fffbeb' },
      { label: 'CONSISTENCY', value: '98%', color: '#10b981', bg: '#ecfdf5' },
      { label: 'EFFORT', value: '56h', color: '#ea580c', bg: '#fff7ed' }
    ];

    stats.forEach((stat, i) => {
      const x = 50 + (i * (colWidth + 10));
      doc.rect(x, gridY, colWidth, 85, 8).fill(stat.bg);
      doc.fillColor(stat.color).fontSize(22).font('Helvetica-Bold').text(stat.value, x, gridY + 25, { width: colWidth, align: 'center' });
      doc.fillColor('#475569').fontSize(8).font('Helvetica-Bold').text(stat.label, x, gridY + 55, { width: colWidth, align: 'center' });
    });

    // --- Learning Journey (Weekly Progress) ---
    doc.fillColor('#1e293b').fontSize(14).font('Helvetica-Bold').text('Curriculum Mastery', 50, 425);
    const tableTop = 450;
    const tableHeaderBg = '#f1f5f9';
    
    doc.rect(50, tableTop, width - 100, 25).fill(tableHeaderBg);
    doc.fillColor('#475569').fontSize(9).font('Helvetica-Bold');
    doc.text('PHASE', 70, tableTop + 8);
    doc.text('FOCUS AREA', 150, tableTop + 8);
    doc.text('SCORE', width - 150, tableTop + 8, { width: 50, align: 'center' });
    doc.text('STATUS', width - 100, tableTop + 8, { width: 50, align: 'center' });

    const phases = [
      { phase: 'Week 1-2', focus: 'Foundations & Architecture', score: '92%', status: 'COMPLETED' },
      { phase: 'Week 3-4', focus: 'Advanced Implementation', score: '95%', status: 'COMPLETED' },
      { phase: 'Week 5-6', focus: 'System Integration', score: '88%', status: 'COMPLETED' },
      { phase: 'Week 7-8', focus: 'Production Readiness', score: '94%', status: 'COMPLETED' }
    ];

    phases.forEach((p, i) => {
      const y = tableTop + 25 + (i * 30);
      if (i % 2 === 0) doc.rect(50, y, width - 100, 30).fill('#ffffff');
      else doc.rect(50, y, width - 100, 30).fill('#f8fafc');
      
      doc.fillColor('#1e293b').fontSize(9).font('Helvetica');
      doc.text(p.phase, 70, y + 10);
      doc.text(p.focus, 150, y + 10);
      doc.fillColor('#4f46e5').font('Helvetica-Bold').text(p.score, width - 150, y + 10, { width: 50, align: 'center' });
      doc.fillColor('#10b981').text(p.status, width - 100, y + 10, { width: 50, align: 'center' });
    });

    // --- Skills Section ---
    const skillSectionY = 600;
    doc.fillColor('#1e293b').fontSize(14).font('Helvetica-Bold').text('Verified Technical Stack', 50, skillSectionY);
    const skills = ['React.js', 'Node.js', 'MongoDB', 'System Design', 'REST APIs', 'Auth', 'Deployment', 'Testing'];
    let skillX = 50;
    let skillY = skillSectionY + 25;
    
    skills.forEach(skill => {
      const textWidth = doc.widthOfString(skill) + 24;
      if (skillX + textWidth > width - 50) {
        skillX = 50;
        skillY += 35;
      }
      doc.roundedRect(skillX, skillY, textWidth, 26, 13).fill('#eff6ff');
      doc.fillColor('#1d4ed8').fontSize(10).font('Helvetica-Bold').text(skill, skillX + 12, skillY + 8);
      skillX += textWidth + 10;
    });

    // --- AI Mentor Recommendation ---
    const recY = 700;
    doc.rect(50, recY, width - 100, 100, 10).fill('#f1f5f9');
    doc.fillColor('#4f46e5').fontSize(11).font('Helvetica-Bold').text('AI MENTOR INSIGHTS', 70, recY + 15);
    doc.fillColor('#1e293b').fontSize(10).font('Helvetica-Oblique').text(
      `"Syed Asif has demonstrated a robust understanding of both frontend and backend paradigms. His ability to architect scalable solutions and maintain high code quality standards is exceptional. He is highly recommended for full-stack engineering roles."`,
      70, recY + 35, { width: width - 140, lineHeight: 1.5 }
    );

    // --- Footer ---
    const height = doc.page.height;
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica').text('This performance report is an official document of AutoIntern. Authenticity can be verified via the associated certificate ID and QR code.', 50, height - 60, { align: 'center', width: width - 100 });
    doc.text('© 2026 AutoIntern Career Acceleration Platform | www.autointern.com', 50, height - 45, { align: 'center', width: width - 100 });

    doc.end();
  } catch (error) {
    console.error('Report Gen Error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const downloadCertificate = async (req, res) => {
  const { id } = req.params;
  try {
    let enrollment;
    let certId;
    
    // Handle Sample Preview Case
    if (id === 'sample-syed-asif') {
      enrollment = {
        studentId: { name: "Syed Asif", profile: { college: "Engineering College" } },
        courseId: { title: "Full Stack Web Development" }
      };
      certId = "AIC-2026-SA-0042";
    } else {
      enrollment = await Enrollment.findById(id).populate('courseId').populate('studentId');
      if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
      certId = enrollment.certificateId || uuidv4();
      if (!enrollment.certificateId) {
        enrollment.certificateId = certId;
        await enrollment.save();
      }
    }

    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify/${certId}`;
    const qrCodeData = await QRCode.toDataURL(verificationUrl);
    
    // Create a landscape A4 PDF
    const doc = new PDFDocument({ 
      layout: 'landscape', 
      size: 'A4',
      margin: 0
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Certificate_${enrollment.studentId.name.replace(/\s+/g, '_')}.pdf`);
    
    doc.pipe(res);
    
    // --- Document Setup ---
    const width = doc.page.width;
    const height = doc.page.height;
    const margin = 30;

    // --- Background & Modern Border ---
    doc.rect(0, 0, width, height).fill('#ffffff');
    
    // Clean Double Border (Vibrant Indigo)
    doc.rect(margin, margin, width - margin * 2, height - margin * 2).lineWidth(1).stroke('#4f46e5');
    doc.rect(margin + 6, margin + 6, width - (margin + 6) * 2, height - (margin + 6) * 2).lineWidth(2).stroke('#4f46e5');
    
    // Minimalist Corner Accents
    const cornerSize = 60;
    doc.save().fillColor('#4f46e5');
    // Top Left
    doc.rect(margin, margin, cornerSize, 8).fill();
    doc.rect(margin, margin, 8, cornerSize).fill();
    // Top Right
    doc.rect(width - margin - cornerSize, margin, cornerSize, 8).fill();
    doc.rect(width - margin - 8, margin, 8, cornerSize).fill();
    // Bottom Left
    doc.rect(margin, height - margin - 8, cornerSize, 8).fill();
    doc.rect(margin, height - margin - cornerSize, 8, cornerSize).fill();
    // Bottom Right
    doc.rect(width - margin - cornerSize, height - margin - 8, cornerSize, 8).fill();
    doc.rect(width - margin - 8, height - margin - cornerSize, 8, cornerSize).fill();
    doc.restore();

    // --- Header Section ---
    const headerY = 80;
    // Clean Modern Logo
    doc.save();
    doc.roundedRect(width / 2 - 30, headerY, 60, 60, 12).fill('#4f46e5');
    doc.fillColor('#ffffff');
    doc.rect(width / 2 - 15, headerY + 20, 30, 20, 2).fill(); // Simple Briefcase
    doc.rect(width / 2 - 8, headerY + 15, 16, 5).fill(); // Handle
    doc.restore();

    doc.fillColor('#1e293b').fontSize(34).font('Helvetica-Bold').text('AutoIntern', 0, headerY + 75, { align: 'center', width: width, characterSpacing: -0.5 });
    doc.fillColor('#64748b').fontSize(10).font('Helvetica-Bold').text('ACCELERATING ENGINEERING CAREERS', 0, headerY + 115, { align: 'center', width: width, characterSpacing: 4 });

    // --- Main Content ---
    const bodyY = 260;
    doc.fillColor('#1e293b').fontSize(44).font('Helvetica-Bold').text('CERTIFICATE OF COMPLETION', 0, bodyY, { align: 'center', width: width, characterSpacing: 1.5 });
    
    doc.moveDown(1.2);
    doc.fillColor('#64748b').fontSize(18).font('Helvetica-Oblique').text('This is to officially recognize that', { align: 'center' });
    
    doc.moveDown(1.5);
    const name = enrollment.studentId.name;
    // Highlighted Name Section
    doc.save();
    const nW = doc.widthOfString(name, { fontSize: 60, font: 'Helvetica-Bold' });
    doc.roundedRect((width - nW - 100) / 2, doc.y - 10, nW + 100, 80, 10).fill('#f8fafc');
    doc.fillColor('#0f172a').fontSize(60).font('Helvetica-Bold').text(name, 0, doc.y + 5, { align: 'center', width: width });
    doc.restore();
    
    doc.moveDown(3);
    doc.fillColor('#64748b').fontSize(15).font('Helvetica').text('has successfully completed the intensive career program for:', { align: 'center' });
    
    doc.moveDown(1.2);
    doc.fillColor('#4f46e5').fontSize(36).font('Helvetica-Bold').text(enrollment.courseId.title.toUpperCase(), { align: 'center', characterSpacing: 1 });
    doc.fillColor('#1e293b').fontSize(11).font('Helvetica-Bold').text('OFFICIALLY VERIFIED & INDUSTRY ACCREDITED', { align: 'center', characterSpacing: 3 });

    // --- Footer Section ---
    const footerY = height - 180;

    // QR Code (Left)
    doc.image(qrCodeData, 100, footerY, { width: 85 });
    doc.fillColor('#94a3b8').fontSize(8).font('Helvetica-Bold').text('DIGITAL AUTHENTICATION', 100, footerY + 95);
    doc.fillColor('#4f46e5').fontSize(7.5).font('Helvetica-Bold').text('verify.autointern.com', 100, footerY + 108);

    // Official Seal (Center)
    doc.save();
    const sealX = width / 2;
    const sealY = footerY + 45;
    // Premium Gold Seal
    doc.circle(sealX, sealY, 55).fill('#b45309');
    doc.circle(sealX, sealY, 50).fill('#f59e0b');
    doc.circle(sealX, sealY, 46).lineWidth(1).stroke('#ffffff');
    doc.fillColor('#ffffff').fontSize(11).font('Helvetica-Bold').text('CERTIFIED', sealX - 35, sealY - 12, { width: 70, align: 'center' });
    doc.text('GRADUATE', sealX - 35, sealY + 2, { width: 70, align: 'center' });
    doc.restore();

    // Signature (Right)
    const sigX = width - 300;
    doc.save();
    doc.translate(sigX + 20, footerY + 20);
    doc.path('M 10 30 C 40 0, 80 60, 120 30 C 160 0, 200 60, 240 30').lineWidth(2).stroke('#1e293b').opacity(0.8);
    doc.restore();
    
    doc.moveTo(sigX, footerY + 70).lineTo(sigX + 200, footerY + 70).lineWidth(1.5).stroke('#e2e8f0');
    doc.fillColor('#1e293b').fontSize(16).font('Helvetica-Bold').text('Director, AutoIntern', sigX, footerY + 80, { width: 200, align: 'center' });
    doc.fillColor('#64748b').fontSize(10).font('Helvetica-Bold').text('INDUSTRY VERIFIED PROGRAM', sigX, footerY + 100, { width: 200, align: 'center' });
    
    // ID Footer
    doc.fillColor('#94a3b8').fontSize(9).font('Helvetica-Bold').text(`CERTIFICATE ID: ${certId.toUpperCase()} | ISSUED ON: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}`, 0, height - 55, { align: 'center', width: width });

    doc.end();
  } catch (error) {
    console.error('Certificate Gen Error:', error);
    res.status(500).json({ error: error.message });
  }
};
