const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
  email: String,
  startingPoint: String,
  destination: String,
  startDate: String,
  endDate: String,
  guests: Number
});

module.exports = mongoose.model('UserCustomization', customizationSchema);
