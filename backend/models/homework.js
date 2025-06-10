const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['finished', 'due', 'overdue'],
  },
});

module.exports = mongoose.model('homework', homeworkSchema);
