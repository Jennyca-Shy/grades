const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

//Get all
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('subject');
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one
router.get('/:id', getSchedule, (req, res) => {
  res.send(res.schedule);
});

//Create one
router.post('/', async (req, res) => {
  const schedule = new Schedule({
    weekday: req.body.weekday,
    subject: req.body.subject,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });
  try {
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update One
router.patch('/:id', getSchedule, async (req, res) => {});

//Delete one
router.delete('single/:id', getSchedule, async (req, res) => {
  try {
    await res.schedule.deleteOne();
    res.json({ message: 'schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete many
router.delete('/many/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Schedule.deleteMany({ subject: id });
    res.json({ message: 'Successfully deleted schedules!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getSchedule(req, res, next) {
  let schedule;
  try {
    schedule = await Schedule.findById(req.params.id);
    if (schedule == null) {
      res.status(404).json({ message: 'couldnt find schedule' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.schedule = schedule;
  next();
}

module.exports = router;
