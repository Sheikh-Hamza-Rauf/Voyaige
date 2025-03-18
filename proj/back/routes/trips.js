// // routes/trips.js
// const express = require('express');
// const router = express.Router();
// const Trip = require('../models/Trip');
// const jwt = require('jsonwebtoken');

// // Create a new trip
// router.post('/', async (req, res) => {
//   try {
//     const { 
//       userId, 
//       startingPoint, 
//       destination, 
//       startDate, 
//       endDate, 
//       guests, 
//       numberOfDays, 
//       hotel, 
//       transport, 
//       dayDetails,
//       status
//     } = req.body;
    
//     const trip = new Trip({
//       userId,
//       startingPoint,
//       destination,
//       startDate,
//       endDate,
//       guests,
//       numberOfDays,
//       hotel,
//       transport,
//       dayDetails,
//       status
//     });

//        // If userId looks like a JWT token, decode it to extract the actual user ID
//        if (userId && userId.split('.').length === 3) {
//         // Replace 'mysecretkey' with your actual secret if different
//         const decoded = jwt.verify(userId, 'mysecretkey'); 
//         userId = decoded.id;
//       }
    
//     await trip.save();
//     res.status(201).json({
//       message: 'Trip created successfully',
//       tripId: trip._id
//     });
//   } catch (error) {
//     console.error('Error creating trip:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get trip by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const trip = await Trip.findById(req.params.id);
    
//     if (!trip) {
//       return res.status(404).json({ message: 'Trip not found' });
//     }
    
//     res.json(trip);
//   } catch (error) {
//     console.error('Error fetching trip:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Update trip by ID
// router.patch('/:id', async (req, res) => {
//   try {
//     const allowedUpdates = [
//       'hotel', 
//       'transport', 
//       'dayDetails', 
//       'status', 
//       'checkoutData'
//     ];
    
//     const updates = {};
//     for (const key of Object.keys(req.body)) {
//       if (allowedUpdates.includes(key)) {
//         updates[key] = req.body[key];
//       }
//     }
    
//     // Add updatedAt timestamp
//     updates.updatedAt = Date.now();
    
//     const trip = await Trip.findByIdAndUpdate(
//       req.params.id,
//       { $set: updates },
//       { new: true }
//     );
    
//     if (!trip) {
//       return res.status(404).json({ message: 'Trip not found' });
//     }
    
//     res.json(trip);
//   } catch (error) {
//     console.error('Error updating trip:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get all trips for a user
// router.get('/user/:userId', async (req, res) => {
//   try {
//     const trips = await Trip.find({ userId: req.params.userId });
//     res.json(trips);
//   } catch (error) {
//     console.error('Error fetching user trips:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Delete trip by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const trip = await Trip.findByIdAndDelete(req.params.id);
    
//     if (!trip) {
//       return res.status(404).json({ message: 'Trip not found' });
//     }
    
//     res.json({ message: 'Trip deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting trip:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Create a new trip
router.post('/', async (req, res) => {
  try {
    const { 
      userEmail, 
      startingPoint, 
      destination, 
      startDate, 
      endDate, 
      guests, 
      numberOfDays, 
      hotel, 
      transport, 
      dayDetails,
      status
    } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required' });
    }

    const trip = new Trip({
      userEmail,
      startingPoint,
      destination,
      startDate,
      endDate,
      guests,
      numberOfDays,
      hotel,
      transport,
      dayDetails,
      status
    });

    await trip.save();

    res.status(201).json({
      message: 'Trip created successfully',
      tripId: trip._id
    });

  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update trip by ID
router.patch('/:id', async (req, res) => {
  try {
    const allowedUpdates = [
      'hotel', 
      'transport', 
      'dayDetails', 
      'status', 
      'checkoutData'
    ];

    const updates = {};
    for (const key of Object.keys(req.body)) {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    // Add updatedAt timestamp
    updates.updatedAt = Date.now();

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all trips for a user by email
router.get('/user/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const trips = await Trip.find({ userEmail });

    res.json(trips);
  } catch (error) {
    console.error('Error fetching user trips:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete trip by ID
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
