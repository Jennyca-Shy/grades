//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  name: [
    {
      language: { type: String },
      text: { type: String },
    },
  ],
  endDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    unique: true,
  },
  subdivisions: {
    type: String,
  },
});

//export default mongoose.model('holiday', holidaySchema);
module.exports = mongoose.model('holiday', holidaySchema);
