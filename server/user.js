const mongoose = require('./db');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    accountCreated: Date,
    lastActive: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
