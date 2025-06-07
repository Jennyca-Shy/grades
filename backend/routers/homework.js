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
router.get('/:id', (req, res) => {});

//Creating one
router.post('/', (req, res) => {
  const homework = new Homework({
    title: req.body.title,
    subject: req.body.subject,
    dueDate: req.body.dueDate,
    notes: req.body.notes,
    status: req.body.status,
  });
});

//Update one
router.patch('/', (req, res) => {});

//Deleting one
router.delete('/', (req, res) => {});

module.exports = router;
