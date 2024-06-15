//Note: Import Mongoose library (ODM)
const mongoose = require('mongoose');

//Note: Connect to MongoDB 
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/SocialNetwork',
);

module.exports = mongoose.connection;