const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    enum: ['LK', 'GK', 'other'],
  },
});

module.exports = mongoose.model('Subject', subjectSchema);
