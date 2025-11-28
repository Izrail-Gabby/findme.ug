// backend/routes/workerRoutes.js
const express = require('express');
const router = express.Router();
const {
  getWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker
} = require('../controllers/workerController');

// @route   GET /api/workers
// @desc    Get all workers with filters
router.get('/', getWorkers);

// @route   GET /api/workers/:id
router.get('/:id', getWorkerById);

// @route   POST /api/workers
router.post('/', createWorker);

// @route   PUT /api/workers/:id
router.put('/:id', updateWorker);

// @route   DELETE /api/workers/:id
router.delete('/:id', deleteWorker);

module.exports = router;
