const express = require('express');
const router = express.Router();
const Homework = require('../models/homework');

//Getting all
router.get('/', async (req, res) => {
  try {
    const homework = await Homework.find().populate('subject');
    res.json(homework);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Getting one
router.get('/id/:id', getHomework, (req, res) => {
  res.send(res.homework);
});

// Get by date
// router.get('/date/:date', async (req, res) => {
//   try {
//     const date = new Date(req.params.date);
//     let startOfDay = new Date(date);
//     startOfDay.setUTCHours(0, 0, 0, 0);
//     let endOfDay = new Date(date);
//     endOfDay.setUTCHours(23, 59, 59, 999);

//     const homeworks = await Homework.find({
//       dueDate: {
//         $gte: startOfDay,
//         $lte: endOfDay,
//       },
//     }).populate('subject');
//     res.json({ answer: homeworks, start: startOfDay, end: endOfDay });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//Creating one
router.post('/', async (req, res) => {
  if (req.body.status == null) {
    const today = new Date().setUTCHours(0, 0, 0, 0);
    const dueDate = new Date(req.body.dueDate);
    if (dueDate - today >= 0) {
      req.body.status = 'due';
    } else {
      req.body.status = 'overdue';
    }
  }
  const homework = new Homework({
    title: req.body.title,
    subject: req.body.subject,
    dueDate: req.body.dueDate,
    notes: req.body.notes,
    status: req.body.status,
  });

  try {
    let newHomework = await homework.save();
    newHomework = await newHomework.populate('subject');
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

//Update many
router.patch('/update/overdue', async (req, res) => {
  const today = new Date().setHours(0, 0, 0, 0);
  try {
    await Homework.updateMany(
      {
        dueDate: { $lt: today },
        status: { $ne: 'finished' },
      },
      {
        $set: {
          status: 'overdue',
        },
      },
    );
    res.status(200).json({ message: 'Homework status updated to overdue' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/update/status/:id', getHomework, async (req, res) => {
  const today = new Date().setHours;
  try {
  } catch (error) {}
});

//Deleting one
router.delete('/single/:id', getHomework, async (req, res) => {
  try {
    await res.homework.deleteOne();
    res.json({ message: 'deleted subscriber' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete many
router.delete('/many/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Homework.deleteMany({ subject: id });
    res.json({ message: 'Successfully deleted homework!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getHomework(req, res, next) {
  let homework;
  try {
    homework = await Homework.findById(req.params.id).populate('subject');
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
