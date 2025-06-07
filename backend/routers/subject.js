const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

//Get all
router.get('/', async (req, res) => {
  try {
    const subject = await Subject.find();
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create one
router.post('/', async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    teacher: req.body.teacher,
    room: req.body.room,
    color: req.body.color,
    notes: req.body.notes,
    type: req.body.type,
  });

  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
