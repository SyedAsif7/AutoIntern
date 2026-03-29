import Internship from '../models/Internship.js';

export const getInternships = async (req, res) => {
  const { domain, mode, duration, location } = req.query;
  try {
    const filter = { isActive: true };
    if (domain) filter.domain = domain;
    if (mode) filter.mode = mode;
    if (duration) filter.duration = { $lte: duration };
    if (location) filter.location = { $regex: location, $options: 'i' };

    const internships = await Internship.find(filter).sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createInternship = async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
