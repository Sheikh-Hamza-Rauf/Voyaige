// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const stripe = require('stripe')('sk_test_51MqErmDG40mBr38y3yBVqwJn9fPUGzLd9ODFIVysUoVrAoh33lgdWa7SyEWlBNH836vTRyHnX7GAklyfYPw3AtA000galZxA8c');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://127.0.0.1:27017/Voyaige', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// app.get('/', (req, res) => {
//   res.send('Welcome to the backend server.');
// });

// // Create Payment Intent Route
// app.post('/api/payment-intent', async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || amount < 1) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Convert to cents
//       currency: 'usd',
//       payment_method_types: ['card'],
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Error creating payment intent:", error);
//     res.status(500).json({ error: "Failed to create payment intent" });
//   }
// });

// const customizationSchema = new mongoose.Schema({
//   email: String,
//   startingPoint: String,
//   destination: String,
//   startDate: String,
//   endDate: String,
//   guests: Number,
// });

// const UserCustomization = mongoose.model("UserCustomization", customizationSchema);

// // API Route to Save Customization
// app.post("/api/users/customizations", async (req, res) => {
//   try {
//     const { email, startingPoint, destination, startDate, endDate, guests } = req.body;

//     if (!email || !startingPoint || !destination || !startDate || !endDate || !guests) {
//       return res.status(400).json({ error: "All fields are required!" });
//     }

//     const newCustomization = new UserCustomization({
//       email,
//       startingPoint,
//       destination,
//       startDate,
//       endDate,
//       guests,
//     });

//     await newCustomization.save();
//     res.status(201).json({ message: "Customization saved successfully!" });
//   } catch (error) {
//     console.error("Error saving customization:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');



// const User = mongoose.model('User', userSchema);

// // Register API
// app.post('/api/users/register', async (req, res) => {
//   try {
//     const { firstName, lastName, email, phoneNumber, password } = req.body;
//     if (!firstName || !lastName || !email || !phoneNumber || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
    
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword });
//     await newUser.save();
    
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Login API
// app.post('/api/users/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }
    
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Login successful', token, user: { firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber } });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
require('dotenv').config();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserCustomization=require("./models/UserCustomizationData")



const app = express();
const PORT = 5000; // Using a hardcoded port

// Define JWT secret directly in this file
const JWT_SECRET = 'mysecretkey'; // Replace with a secure key for production

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (hardcoded URI)
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the backend server.');
});
// Import and use user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


// Import and use search routes
const searchRoutes = require('./routes/search');
app.use('/api', searchRoutes);


// Create Payment Intent Route
app.post('/api/payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Convert to cents and round to the nearest integer
    const amountInCents = Math.round(amount * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

// API Route to Save Customization
app.post("/api/users/customizations", async (req, res) => {
  try {
    const { email, startingPoint, destination, startDate, endDate, guests } = req.body;

    if (!email || !startingPoint || !destination || !startDate || !endDate || !guests) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newCustomization = new UserCustomization({
      email,
      startingPoint,
      destination,
      startDate,
      endDate,
      guests,
    });

    await newCustomization.save();
    res.status(201).json({ message: "Customization saved successfully!" });
  } catch (error) {
    console.error("Error saving customization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const Trip = require('./models/Trip');
const tripRoutes = require('./routes/trips');

// Routes
app.use('/api/trips', tripRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});