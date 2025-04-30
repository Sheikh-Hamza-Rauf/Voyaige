const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  startingPoint: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  guests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserCustomization = mongoose.models.UserCustomization || mongoose.model('UserCustomization', customizationSchema);

module.exports = UserCustomization;
