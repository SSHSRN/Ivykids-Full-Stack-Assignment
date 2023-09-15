const mongoose = require('./db');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    accountCreated: Date,
    joined: String,
    lastActive: Date,
    followersCount: Number,
    followers: Array,
    followingCount: Number,
    following: Array,
    tweetsCount: Number,
    tweets: Array,
    token: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
