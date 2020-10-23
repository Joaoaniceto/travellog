const { Router } = require('express');

const router = Router();

const LogEntry = require('../models/logEntry');

router.get('/', async (req, res) => {
  const entries = await LogEntry.find();
  res.json(entries);
});

router.post('/', async (req, res, next) => {
  try {
    const entry = new LogEntry(req.body);
    const createEntry = await entry.save();
    res.json(createEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
