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
        const newUser = new user({
            name,
            username,
            email,
            password: hashedPassword,
            accountCreated: Date.now(),
            lastActive: Date.now(),
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
        const passwordMatch = await bcrypt.compare(password, u.password);

        if (!passwordMatch) {
            return res.status(200).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token that expires in 10 minutes
        const token = jwt.sign({ userId: u._id }, process.env.JWT_SECRET, {
            expiresIn: '10m',
        });

        // Update the last active field in the database
        await user.updateOne({ _id: u._id }, { lastActive: Date.now() });
        await user.updateOne({ _id: u._id }, { token });
        await user.updateOne({ _id: u._id }, { followersCount: 0 });
        await user.updateOne({ _id: u._id }, { followingCount: 0 });
        await user.updateOne({ _id: u._id }, { followers: [] });
        await user.updateOne({ _id: u._id }, { following: [] });
        await user.updateOne({ _id: u._id }, { tweets: [] });
        await user.updateOne({ _id: u._id }, { tweetsCount: 0 });
        
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

const logout = async (req, res) => {
    try {
        const { username } = req.body;

        console.log(username);

        // Remove the token from the database
        await user.updateOne({ username }, { token: '' });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    sign_up,
    login,
    logout,
}
