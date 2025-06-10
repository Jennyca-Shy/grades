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

//Getting one
router.get('/id/:id', getSubject, (req, res) => {
  res.send(res.subject);
});

//Get by type
router.get('/type/:type', async (req, res) => {
  try {
    const subjects = await Subject.find({ type: req.params.type });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create one
router.post('/', async (req, res) => {
  try {
    const existing = await Subject.findOne({ name: req.body.name.trim() });
    if (existing) {
      return res.status(400).json({ message: 'duplicate' });
    }

    const subject = new Subject({
      name: req.body.name,
      teacher: req.body.teacher,
      room: req.body.room,
      color: req.body.color,
      notes: req.body.notes,
      type: req.body.type,
    });
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update one
router.patch('/:id', getSubject, async (req, res) => {
  if (req.body.name != null) {
    res.subject.name = req.body.name;
  }
  if (req.body.teacher != null) {
    res.subject.teacher = req.body.teacher;
  }
  if (req.body.room != null) {
    res.subject.room = req.body.room;
  }
  if (req.body.color != null) {
    res.subject.color = req.body.color;
  }
  if (req.body.notes != null) {
    res.subject.notes = req.body.notes;
  }
  if (req.body.type != null) {
    res.subject.type = req.body.type;
  }

  try {
    const updatedSubject = await res.subject.save();
    res.json(updatedSubject);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one
router.delete('/:id', getSubject, async (req, res) => {
  try {
    await res.subject.deleteOne();
    res.json({ message: 'deleted subscriber' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getSubject(req, res, next) {
  let subject;
  try {
    subject = await Subject.findById(req.params.id);
    if (subject == null) {
      res.status(404).json({ message: 'couldnt find the subject!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.subject = subject;
  next();
}

module.exports = router;
