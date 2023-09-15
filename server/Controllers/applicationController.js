require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require("../user");

const add_tweet = async (req, res) => {
    try {
        const { username, content, media, token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const u = await user.findOne({ username: username });
        if (!u) {
            return res.status(200).json({ message: 'Invalid credentials' });
        }
        // create a unique id for the tweet
        const tweetId = Date.now();
        // Append the new tweet to the user's tweets array
        const newTweet = {
            content: content,
            media: media,
            date: new Date(),
            tweetId: tweetId,
        };
        await user.updateOne({ username: username }, { $push: { tweets: newTweet } });
        await user.updateOne({ username: username }, { $inc: { tweetsCount: 1 } });
        res.status(200).json({ message: 'Tweet added successfully', tweetId: tweetId });
    }
    catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

const delete_tweet = async (req, res) => {
    try {
        const { username, tweetId, token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Delete the tweet from the user's tweets array
        await user.updateOne({ username: username }, { $pull: { tweets: { tweetId: tweetId } } });
        await user.updateOne({ username: username }, { $inc: { tweetsCount: -1 } });
        res.status(200).json({ message: 'Tweet deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

const search_user = async (req, res) => {
    try {
        const { username } = req.query;
        // query the database for users with the username and similar usernames. Get the username and name fields of the matched users
        const users = await user.find({ username: { $regex: username, $options: 'i' } }, { username: 1, name: 1 });
        res.status(200).json({ users: users });
    }
    catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

const get_timeline_tweets = async (req, res) => {
    // Get the user's following array
    const { username, token } = req.query;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Get the user's following array
    const u = await user.findOne({ username: username });
    const following = u.following;

    // Get the tweets of all the users in the following array along with their username and name fields
    const tweets = await user.find({ username: { $in: following } }, { username: 1, name: 1, tweets: 1 });

    // Flatten the tweets array with the username and name fields
    const timeline_tweets = [];
    tweets.forEach((t) => {
        t.tweets.forEach((tweet) => {
            timeline_tweets.push({
                username: t.username,
                name: t.name,
                content: tweet.content,
                media: tweet.media,
                date: tweet.date,
                tweetId: tweet.tweetId,
            });
        });
    });

    // Sort the tweets by date
    timeline_tweets.sort((a, b) => {
        return b.date - a.date;
    });

    res.status(200).json({ tweets: timeline_tweets });
}

module.exports = {
    add_tweet,
    delete_tweet,
    search_user,
    get_timeline_tweets,
}
