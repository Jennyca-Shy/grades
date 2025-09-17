const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'paused', 'done'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  notes: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Todo', todoSchema);
