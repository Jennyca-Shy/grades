const express = require('express');
const router = express.Router();
const Holiday = require('../models/holiday');

//Get all
router.get('/', async (req, res) => {
  try {
    const holiday = await Holiday.find();
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Getting one
router.get('/id/:id', getHoliday, (req, res) => {
  res.send(res.holiday);
});

//Create one
router.post('/', async (req, res) => {
  try {
    const holiday = new Holiday({
      name: req.body.name,
      endDate: req.body.endDate,
      startDate: req.body.startDate,
      subdivisions: req.body.subdivisions,
    });
    const newHoliday = await holiday.save();
    res.status(201).json(newHoliday);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update one
router.patch('/:id', getHoliday, async (req, res) => {
  if (req.body.name != null) {
    res.holiday.name = req.body.name;
  }
  if (req.body.endDate != null) {
    res.holiday.endDate = req.body.endDate;
  }
  if (req.body.startDate != null) {
    res.holiday.startDate = req.body.startDate;
  }
  if (req.body.subdivisions != null) {
    res.holiday.subdivisions = req.body.subdivisions;
  }

  try {
    const updatedHoliday = await res.holiday.save();
    res.json(updatedHoliday);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one
router.delete('/:id', getHoliday, async (req, res) => {
  try {
    await res.holiday.deleteOne();
    res.json({ message: 'deleted holiday' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getHoliday(req, res, next) {
  let holiday;
  try {
    holiday = await Holiday.findById(req.params.id);
    if (holiday == null) {
      res.status(404).json({ message: 'couldnt find the holiday!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.holiday = holiday;
  next();
}

module.exports = router;
