require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require("../user");

const sign_up = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(200).send('Username already exists');
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create a string of the current month and year
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const joined = `${month} ${year}`;

        const newUser = new user({
            name,
            username,
            email,
            password: hashedPassword,
            accountCreated: Date.now(),
            joined: joined,
            lastActive: Date.now(),
            followersCount: 0,
            followers: [],
            followingCount: 0,
            following: [],
            tweetsCount: 0,
            tweets: [],
            token: '',
        });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const u = await user.findOne({ username });

        if (!u) {
            return res.status(200).json({ message: 'Invalid credentials' });
        }

        // Check the password
        const passwordMatch = bcrypt.compare(password, u.password);

        if (!passwordMatch) {
            return res.status(200).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token that expires in 10 minutes
        const token = jwt.sign({ userId: u._id }, process.env.JWT_SECRET, {
            expiresIn: '10m',
        });

        // Update the last active field in the database
        await user.updateOne({ username: u.username }, { lastActive: Date.now() });
        await user.updateOne({ username: u.username }, { token: token });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

const logout = async (req, res) => {
    try {
        const { username } = req.body;

        // Remove the token from the database
        await user.updateOne({ username }, { token: '' });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

const verify = async (req, res) => {
    try {
        const { token } = req.body;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by id
        const u = await user.findOne({ _id: decoded.userId });

        if (!u) {
            return res.status(200).json({ message: 'Invalid token' });
        }

        // Check if the token is the same as the one in the database
        if (u.token !== token) {
            return res.status(200).json({ message: 'Invalid token' });
        }

        const { username, name, joined, followersCount, followers, followingCount, following, tweetsCount, tweets } = u;
        res.status(200).json({ message: 'Valid token', user: { username, name, joined, followersCount, followers, followingCount, following, tweetsCount, tweets } });
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Invalid token' });
    }
}

const get_user = async (req, res) => {
    try {
        const { token, user_name } = req.body;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by id
        const u = await user.findOne({ username: user_name });

        if (!u) {
            return res.status(200).json({ message: 'Invalid token' });
        }

        const { username, name, joined, followersCount, followers, followingCount, following, tweetsCount, tweets } = u;
        res.status(200).json({ message: 'Valid token', user: { username, name, joined, followersCount, followers, followingCount, following, tweetsCount, tweets } });
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Invalid token' });
    }
}

const follow_user = async (req, res) => {
    try {
        const { currUser, userToFollow, token } = req.body;
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by id
        const u = await user.findOne({ username: currUser });

        if (!u) {
            return res.status(200).json({ message: 'Invalid token' });
        }

        // Check if the token is the same as the one in the database
        if (u.token !== token) {
            return res.status(200).json({ message: 'Invalid token' });
        }

        // Find the user to follow
        const u2 = await user.findOne({ username: userToFollow });
        // Update the following array
        await user.updateOne({ username: currUser }, { following: [...u.following, userToFollow] });
        await user.updateOne({ username: currUser }, { followingCount: u.followingCount + 1 });

        // Update the followers array
        await user.updateOne({ username: userToFollow }, { followers: [...u2.followers, currUser] });
        await user.updateOne({ username: userToFollow }, { followersCount: u2.followersCount + 1 });

        res.status(200).json({ message: 'Followed successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

const unfollow_user = async (req, res) => {
    try {
        const { currUser, userToUnfollow, token } = req.body;
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by id
        const u = await user.findOne({ username: currUser });

        if (!u) {
            return res.status(200).json({ message: 'Invalid token' });
        }

        // Check if the token is the same as the one in the database
        if (u.token !== token) {
            return res.status(200).json({ message: 'Invalid token' });
        }

        // Find the user to unfollow
        const u2 = await user.findOne({ username: userToUnfollow });
        // Update the following array by removing the user
        await user.updateOne({ username: currUser }, { following: u.following.filter((user) => user !== userToUnfollow) });
        await user.updateOne({ username: currUser }, { followingCount: u.followingCount - 1 });

        // Update the followers array by removing the user
        await user.updateOne({ username: userToUnfollow }, { followers: u2.followers.filter((user) => user !== currUser) });
        await user.updateOne({ username: userToUnfollow }, { followersCount: u2.followersCount - 1 });

        res.status(200).json({ message: 'Unfollowed successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    sign_up,
    login,
    logout,
    verify,
    get_user,
    follow_user,
    unfollow_user,
}
