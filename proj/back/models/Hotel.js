const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  images: [String],
  price: String,
  city: { type: String, required: true },
  facilities: [String],
  about: String,
  hotel_id: { type: Number, required: true }
});

module.exports = mongoose.model('Hotel', hotelSchema);
