const mongoose = require('mongoose');

const PreplannedSchema = new mongoose.Schema({
  email: { type: String, required: true },
  tripTitle: { type: String, required: true },
  cityBookings: [
    {
      cityName: { type: String, required: true },
      days: { type: Number, required: true },
    },
  ],
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Preplanned = mongoose.model('Preplanned', PreplannedSchema);

module.exports = Preplanned;
