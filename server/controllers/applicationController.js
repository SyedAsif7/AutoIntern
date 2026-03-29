import Application from '../models/Application.js';
import User from '../models/User.js';

export const saveApplication = async (req, res) => {
  const { uid, internshipId, status, notes, boostedWithReport } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    let application = await Application.findOne({ studentId: user._id, internshipId });
    if (application) {
      application.status = status || application.status;
      application.notes = notes || application.notes;
      if (boostedWithReport !== undefined) application.boostedWithReport = boostedWithReport;
    } else {
      application = new Application({ 
        studentId: user._id, 
        internshipId, 
        status: status || 'applied', 
        notes,
        boostedWithReport: boostedWithReport || false
      });
    }
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyApplications = async (req, res) => {
  const { uid } = req.query;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const applications = await Application.find({ studentId: user._id })
      .populate('internshipId')
      .sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes, nextStep } = req.body;
  try {
    const application = await Application.findByIdAndUpdate(id, { status, notes, nextStep }, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
