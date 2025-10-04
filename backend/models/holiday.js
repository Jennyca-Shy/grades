import mongoose from 'mongoose';

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
  },
  subdivisions: {
    type: String,
  },
});

export default mongoose.model('holiday', holidaySchema);
