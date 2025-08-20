const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

//Get all
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('subject');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one
router.get('/:id', getAppointment, (req, res) => {
  res.send(res.appointment);
});

//Create one
router.post('/', async (req, res) => {
  const appointment = new Appointment({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    color: req.body.color,
    slot: req.body.slot,
    subject: req.body.subject,
  });
  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update One
router.patch('/:id', getAppointment, async (req, res) => {
  if (req.body.title != null) {
    res.appointment.title = req.body.title;
  }
  if (req.body.startDate != null) {
    res.appointment.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.appointment.endDate = req.body.endDate;
  }
  if (req.body.color != null) {
    res.appointment.color = req.body.color;
  }
  if (req.body.slot != null) {
    res.appointment.slot = req.body.slot;
  }
  if (req.body.subject != null) {
    res.appointment.subject = req.body.subject;
  }

  try {
    const updatedAppointment = await res.appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one
router.delete('/single/:id', getAppointment, async (req, res) => {
  try {
    await res.appointment.deleteOne();
    res.json({ message: 'appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete many
router.delete('/many/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Appointment.deleteMany({ subject: id });
    res.json({ message: 'Successfully deleted homework!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getAppointment(req, res, next) {
  let appointment;
  try {
    appointment = await Appointment.findById(req.params.id);
    if (appointment == null) {
      res.status(404).json({ message: 'couldnt find appointment' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.appointment = appointment;
  next();
}

module.exports = router;
