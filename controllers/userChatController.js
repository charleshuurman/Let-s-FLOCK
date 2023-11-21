const UserChat = require('../models/userChat');

const userChatController = {
    postMessage: async (req, res) => {
        try {
            const { userId, headlineId, message } = req.body;
            const chatMessage = await UserChat.create({ userId, headlineId, message });

            res.status(201).json({ message: 'Chat message posted successfully', chatMessage });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error posting chat message');
        }
    },

    getChatMessages: async (req, res) => {
        try {
            const { headlineId } = req.params;
            const chatMessages = await UserChat.findAll({
                where: { headlineId },
                include: [{ model: User, attributes: ['username'] }], // Assuming User model is related
                order: [['timestamp', 'DESC']] // Latest messages first
            });

            if (!chatMessages) {
                return res.status(404).send('No chat messages found for this headline');
            }

            res.status(200).json(chatMessages);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving chat messages');
        }
    },

};

module.exports = userChatController;
