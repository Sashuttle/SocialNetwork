//Note: Import Mongoose library (ODM)
const mongoose = require('mongoose');

//Note: Connect to MongoDB 
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        debug: true
    }
);

module.exports = mongoose.connection;