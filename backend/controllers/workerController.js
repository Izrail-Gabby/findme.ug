// backend/controllers/workerController.js
const Worker = require('../models/Worker');

// @desc    Get all workers with search & filters
exports.getWorkers = async (req, res) => {
  try {
    const { service, area, location } = req.query;
    
    let query = {};
    if (service) query.services = { $in: [service] };
    if (area) query.area = new RegExp(area, 'i');
    if (location) query.location = new RegExp(location, 'i');

    const workers = await Worker.find(query)
      .select('-__v')
      .sort({ rating: -1, verified: -1 });

    res.json({
      success: true,
      count: workers.length,
      data: workers
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single worker
exports.getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ success: false, message: 'Worker not found' });
    res.json({ success: true, data: worker });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new worker
exports.createWorker = async (req, res) => {
  try {
    const worker = await Worker.create(req.body);
    res.status(201).json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update worker
exports.updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!worker) return res.status(404).json({ success: false, message: 'Worker not found' });
    res.json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete worker
exports.deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) return res.status(404).json({ success: false, message: 'Worker not found' });
    res.json({ success: true, message: 'Worker deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
