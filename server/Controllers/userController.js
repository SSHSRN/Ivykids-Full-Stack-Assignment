require("dotenv").config();
const bcrypt = require('bcrypt');
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

module.exports = {
    sign_up,
}
