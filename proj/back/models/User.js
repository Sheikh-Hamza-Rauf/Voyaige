const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    password: String,
    points: { type: Number, default: 0 },
    challengesStatus: {
        type: Object,
        default: {
            "1": false,
            "2": false,
            "3": false,
            "4": false
        }
    },
    lastLoginDate: Date, // New field to track the last login date
    consecutiveLoginDays: { type: Number, default: 0 } // New field to track consecutive login days
});

module.exports = mongoose.model('User', userSchema);
