const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  result: {
    type: Number,
  },
  outOf: {
    type: String,
    required: true,
    default: 15,
  },
  semester: {
    type: String,
    required: true,
    enum: ['12/1', '12/2', '13/1', '13/2', 'none'],
  },
  type: {
    type: String,
    required: true,
    enum: ['Schulaufgabe', 'Kurzarbeit', 'Stegreifaufgabe', 'Abfrage', 'Abitur'],
  },
  notes: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('grade', gradeSchema);
