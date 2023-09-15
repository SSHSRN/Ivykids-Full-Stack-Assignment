// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_CONN_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// check if connected successfully
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected successfully to server');
});

module.exports = mongoose;
