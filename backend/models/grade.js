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
    type: String,
  },
  outOf: {
    type: String,
    required: true,
    default: 15,
  },
  notes: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('grade', gradeSchema);
