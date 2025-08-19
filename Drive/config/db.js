const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(`${process.env.MONGODB_URI}/mydatabase`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = connectDB;