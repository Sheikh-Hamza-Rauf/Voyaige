// models/Trip.js
const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },  // Added field
  startingPoint: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  numberOfDays: {
    type: Number,
    required: true,
    min: 1
  },
  hotel: {
    type: Object,
    default: null
  },
  transport: {
    type: Object,
    default: null
  },
  dayDetails: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    enum: ['draft', 'checkout', 'paid', 'completed', 'cancelled'],
    default: 'draft'
  },
  checkoutData: {
    type: Object,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
TripSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Trip', TripSchema);