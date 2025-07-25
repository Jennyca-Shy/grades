const mongoose = require('mongoose');

const appointmentSchema = new Schema({
  title: {
    type: String,
  },
});

module.exports = mongoose.model('appointment', appointmentSchema);
