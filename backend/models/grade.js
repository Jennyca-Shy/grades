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
    default: Date.now,
  },
  result: {
    type: String,
    default: 'ausstehend',
  },
});

module.exports = mongoose.model('grade', gradeSchema);
