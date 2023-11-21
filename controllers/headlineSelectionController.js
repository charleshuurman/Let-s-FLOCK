const UserHeadlineSelection = require('../models/userHeadlineSelection');

const headlineSelectionController = {
    addUserSelection: async (req, res) => {
        try {
            const { userId, headlineId, selected_timeslots } = req.body;
            const selection = await UserHeadlineSelection.create({
                userId,
                headlineId,
                selected_timeslots
            });

            res.status(201).json({ message: 'Selection added successfully', selection });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error adding selection');
        }
    },

    updateUserSelection: async (req, res) => {
        try {
            const { selectionId } = req.params;
            const { selected_timeslots } = req.body;
            const selection = await UserHeadlineSelection.findByPk(selectionId);

            if (!selection) {
                return res.status(404).send('Selection not found');
            }

            await selection.update({ selected_timeslots });
            res.status(200).send('Selection updated successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating selection');
        }
    },

    removeUserSelection: async (req, res) => {
        try {
            const { selectionId } = req.params;
            const selection = await UserHeadlineSelection.findByPk(selectionId);

            if (!selection) {
                return res.status(404).send('Selection not found');
            }

            await selection.destroy();
            res.status(200).send('Selection removed successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error removing selection');
        }
    },

    // ... other methods ...
};

module.exports = headlineSelectionController;
