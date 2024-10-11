const express = require('express');
const Restaurant = require('../models/Restaurant');
const Hotel = require('../models/Hotel');
const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { city, name } = req.query;
    console.log('Received search query:', { city, name }); // Add this line for debugging

    const query = {};

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    const [hotels, restaurants] = await Promise.all([
      Hotel.find(query).limit(3),
      Restaurant.find(query).limit(3)
    ]);

    console.log('Search results:', { hotels, restaurants }); // Add this line for debugging

    res.status(200).json({ hotels, restaurants });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ msg: 'Error searching', error: error.message });
  }
});

module.exports = router;