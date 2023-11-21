const bcrypt = require('bcrypt');
const User = require('../models/user');

const userController = {
    register: async (req, res) => {
        try {
            const { username, fullName, gender, overEighteen, email, password, geoLocation, bio } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username,
                fullName,
                gender,
                overEighteen,
                email,
                password: hashedPassword,
                geoLocation,
                bio
            });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error registering new user');
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(401).send('User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send('Invalid password');
            }

            // Here you would typically create a session or token
            // For now, we'll just send a success response
            res.status(200).json({ message: 'Logged in successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Login error');
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { userId, fullName, gender, geoLocation, bio } = req.body;
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).send('User not found');
            }

            await user.update({ fullName, gender, geoLocation, bio });
            res.status(200).send('Profile updated successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating profile');
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { userId, newPassword } = req.body;
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await User.update({ password: hashedPassword }, {
                where: { id: userId }
            });

            res.status(200).send('Password updated successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating password');
        }
    },

};

module.exports = userController;
