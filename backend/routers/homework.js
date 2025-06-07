const express = require('express');
const router = express.Router();
const Homework = require('../models/homework');

//Getting all
router.get('/', async (req, res) => {
  try {
    const homework = await Homework.find();
    res.json(homework);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Getting one
router.get('/:id', getHomework, (req, res) => {
  res.send(res.homework);
});

//Creating one
router.post('/', async (req, res) => {
  const homework = new Homework({
    title: req.body.title,
    subject: req.body.subject,
    dueDate: req.body.dueDate,
    notes: req.body.notes,
    status: req.body.status,
  });

  try {
    const newHomework = await homework.save();
    res.status(201).json(newHomework);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update one
router.patch('/:id', getHomework, async (req, res) => {
  if (req.body.title != null) {
    res.homework.title = req.body.title;
  }
  if (req.body.subject != null) {
    res.homework.subject = req.body.subject;
  }
  if (req.body.dueDate != null) {
    res.homework.dueDate = req.body.dueDate;
  }
  if (req.body.notes != null) {
    res.homework.notes = req.body.notes;
  }
  if (req.body.status != null) {
    res.homework.status = req.body.status;
  }

  try {
    const updatedHomework = await res.homework.save();
    res.json(updatedHomework);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Deleting one
router.delete('/:id', getHomework, async (req, res) => {
  try {
    await res.homework.deleteOne();
    res.json({ message: 'deleted subscriber' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getHomework(req, res, next) {
  let homework;
  try {
    homework = await Homework.findById(req.params.id);
    if (homework == null) {
      res.status(404).json({ message: 'couldnt find homework' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.homework = homework;
  next();
}

module.exports = router;
