const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  service: {
    type: String,
  },
  Open_hour: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
    },
  ],
  restaurant_id: {
    type: Number,
    required: true,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
