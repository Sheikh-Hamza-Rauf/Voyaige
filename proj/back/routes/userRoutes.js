const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, 10),
      points: 0,
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });

    let user = await User.findOne({ email });
    if (!user) {
      console.error('User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    res.json({ msg: 'Login successful', user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/updatePoints', async (req, res) => {
  console.log("in update");
  try {
      const { email, points, challengeId } = req.body;

      // Update points and set the challenge status as completed
      const updatedUser = await User.findOneAndUpdate(
          { email },
          {
              $inc: { points }, // Increment points atomically
              $set: { [`challengesStatus.${challengeId}`]: true } // Mark the specified challenge ID as completed
          },
          { new: true, useFindAndModify: false } // Return the updated document and disable useFindAndModify deprecation warning
      );

      if (!updatedUser) {
          console.log("User not found");
          return res.status(404).json({ msg: 'User not found' });
      }

      // Log to check the full updated document
      console.log("Updated user:", updatedUser);

      res.status(200).json({ msg: 'Points and challenge status updated successfully', user: updatedUser });
  } catch (err) {
      console.error('Error updating points:', err);
      res.status(500).json({ msg: 'Server error' });
  }
});
// Express route to check all challenge statuses for a user
router.post('/checkAllChallengeStatuses', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user based on the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Send the challenge status back to the client
    res.status(200).json({ statuses: user.challengesStatus });
  } catch (err) {
    console.error('Error fetching challenge statuses:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});
// Route to check consecutive login days
router.post('/checkConsecutiveLogins', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const currentDate = new Date();
    const lastLoginDate = new Date(user.lastLoginDate);
    const diffDays = Math.floor((currentDate - lastLoginDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      // Reset consecutive login days
      user.consecutiveLoginDays = 0;
    } else if (diffDays === 1) {
      // Increment consecutive login days
      user.consecutiveLoginDays += 1;
    } else if (diffDays === 0) {
      // User logged in today already
      return res.json({ consecutiveLoginDays: user.consecutiveLoginDays, lastLoginDate: user.lastLoginDate });
    }

    user.lastLoginDate = currentDate;
    await user.save();

    res.json({ consecutiveLoginDays: user.consecutiveLoginDays, lastLoginDate: user.lastLoginDate });
  } catch (error) {
    console.error("Error checking consecutive login days:", error);
    res.status(500).send("Internal server error");
  }
});
router.get('/points', async (req, res) => {
  try {
    const email = req.headers['x-user-email']; // Extract email from custom header

    if (!email) {
      return res.status(400).json({ msg: 'Email is required' });
    }

    // Fetch the user from the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return the points
    res.status(200).json({ points: user.points });
  } catch (error) {
    console.error('Error fetching points:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});



module.exports = router;
