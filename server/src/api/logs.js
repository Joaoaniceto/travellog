const { Router } = require('express');

const router = Router();

const LogEntry = require('../models/logEntry');

router.get('/', async (req, res) => {
  const entries = await LogEntry.find();
  res.json(entries);
});

router.post('/delete', async (req, res, next) => {
  try {
    const entry = new LogEntry(req.body);
    const entries = await LogEntry.find({ _id: entry.id });
    console.log(entries);
    await LogEntry.deleteOne(entries[0]);
    const allentries = await LogEntry.find();
    res.json(allentries);
  } catch (error) {
    next(error);
  }
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
