const express = require('express');
const router = express.Router();
const Grade = require('../models/grade');

//Get all
router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find().populate('subject');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one
router.get('/:id', getGrade, (req, res) => {
  res.send(res.grade);
});

//Create one
router.post('/', async (req, res) => {
  const grade = new Grade({
    title: req.body.title,
    date: req.body.date,
    subject: req.body.subject,
    result: req.body.result,
    outOf: req.body.outOf,
    notes: req.body.notes,
  });
  try {
    const newGrade = await grade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update One
router.patch('/:id', getGrade, async (req, res) => {
  if (req.body.title != null) {
    res.grade.title = req.body.title;
  }
  if (req.body.date != null) {
    res.grade.date = req.body.date;
  }
  if (req.body.subject != null) {
    res.grade.subject = req.body.subject;
  }
  if (req.body.result != null) {
    res.grade.result = req.body.result;
  }
  if (req.body.outOf != null) {
    res.grade.outOf = req.body.outOf;
  }
  if (req.body.notes != null) {
    res.grade.notes = req.body.notes;
  }

  try {
    const updatedGrade = await res.grade.save();
    res.json(updatedGrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one
router.delete('single/:id', getGrade, async (req, res) => {
  try {
    await res.grade.deleteOne();
    res.json({ message: 'grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete many
router.delete('/many/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Grade.deleteMany({ subject: id });
    res.json({ message: 'Successfully deleted homework!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getGrade(req, res, next) {
  let grade;
  try {
    grade = await Grade.findById(req.params.id);
    if (grade == null) {
      res.status(404).json({ message: 'couldnt find grade' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.grade = grade;
  next();
}

module.exports = router;
