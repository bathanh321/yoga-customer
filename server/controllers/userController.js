const User = require('../models/User');
const bcrypt = require('bcrypt');

const userController = {
    register: async (req, res) => {
        const { username, email, password, role } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ msg: 'Email already exists' });
            }

            if (!/^[a-zA-Z0-9]+$/.test(password)) {
                return res.status(400).json({ message: 'Password can only contain letters and numbers, no spaces or special characters' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role: role || 'customer',
            });

            const user = await newUser.save();

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            req.session.userId = user._id;
            req.session.role = user.role;
            req.session.username = user.username;

            res.status(200).json({ msg: 'Login successful', username: user.username });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    logout: async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ msg: 'Failed to log out' });
            }
            res.status(200).json({ msg: 'Logged out' });
        });
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.session.userId)
                .select('-password')
                .populate({
                    path: 'courses',
                    populate: {
                        path: 'classType',
                        select: 'typeName'
                    }
                });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error('Error retrieving user information:', error);
            res.status(500).json({ message: 'Error retrieving user information', error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = userController;